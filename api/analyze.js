export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "No URL provided" });

    const urlLower = url.toLowerCase().trim();

    // ── Feature Extraction ──────────────────────────────────────────────
    let hostname = "";
    try {
      const parsed = new URL(urlLower.startsWith("http") ? urlLower : "http://" + urlLower);
      hostname = parsed.hostname;
    } catch {
      hostname = urlLower.split("/")[0];
    }

    const has_https = urlLower.startsWith("https://");
    const url_length = url.length;
    const hostParts = hostname.split(".");
    const num_subdomains = Math.max(0, hostParts.length - 2);
    const contains_ip = /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname);

    const SUSPICIOUS_KEYWORDS = ["login", "verify", "bank", "secure", "update", "account", "support", "billing", "recovery"];
    const suspicious_keywords = SUSPICIOUS_KEYWORDS.filter(kw => urlLower.includes(kw));

    const features = { has_https, url_length, num_subdomains, contains_ip, suspicious_keywords };

    // ── Known Phishing DB ───────────────────────────────────────────────
    const KNOWN_PHISHING = [
      "secure-login-update.com",
      "bank-verify-account.net",
      "paypal-support-help.org",
      "apple-id-recovery.info",
      "netflix-billing-update.com",
      "192.168.1.100",
    ];
    const isKnownPhishing = KNOWN_PHISHING.some(domain => urlLower.includes(domain));

    if (isKnownPhishing) {
      return res.status(200).json({
        score: 1.0,
        label: "Dangerous",
        reasons: ["URL is listed in known phishing database."],
        features,
      });
    }

    // ── Rule-Based Scoring (0–1 float) ─────────────────────────────────
    let score = 0.0;
    const reasons = [];

    if (contains_ip) {
      score += 0.6;
      reasons.push("Contains IP address instead of domain name.");
    }

    if (!has_https && urlLower.startsWith("http://")) {
      score += 0.2;
      reasons.push("Does not use HTTPS.");
    }

    if (url_length > 75) {
      score += 0.1;
      reasons.push("URL is suspiciously long, which can be used to hide the true destination.");
    }

    if (num_subdomains > 1) {
      score += 0.2;
      reasons.push(`Contains multiple subdomains (${num_subdomains}), common in spoofing attacks.`);
    }

    if (suspicious_keywords.length > 0) {
      score += 0.3;
      reasons.push(`Contains suspicious keywords: ${suspicious_keywords.join(", ")}.`);
    }

    score = Math.min(0.95, score);

    // ── AI Explainability Layer ─────────────────────────────────────────
    let aiReason;
    if (contains_ip) {
      aiReason = "AI Analysis: The URL uses a raw IP address instead of a domain name, a common technique to obscure server identity in phishing attacks.";
    } else if (suspicious_keywords.length > 0) {
      aiReason = `AI Analysis: The presence of urgency keywords (${suspicious_keywords.join(", ")}) is a hallmark of social engineering designed to prompt hasty, ill-considered action.`;
    } else if (num_subdomains > 2) {
      aiReason = "AI Analysis: Deeply nested subdomains are frequently used to spoof legitimate services (e.g. paypal.legit-looking.evil.com).";
    } else if (!has_https) {
      aiReason = "AI Analysis: Missing HTTPS encryption indicates a potentially insecure or newly spun-up server, common in short-lived phishing campaigns.";
    } else {
      aiReason = "AI Analysis: No distinct malicious structural patterns detected at this time, but always verify the domain owner before entering credentials.";
    }
    reasons.push(aiReason);

    // ── Classification ──────────────────────────────────────────────────
    let label;
    if (score >= 0.7) {
      label = "Dangerous";
    } else if (score >= 0.3) {
      label = "Suspicious";
    } else {
      label = "Safe";
      if (reasons.length === 1) {
        reasons.unshift("No immediate threats detected based on URL structure.");
      }
    }

    return res.status(200).json({ score, label, reasons, features });

  } catch (error) {
    return res.status(500).json({ error: "Internal server error", details: error.message });
  }
}
