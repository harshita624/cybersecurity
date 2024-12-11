export async function POST(req) {
    try {
        // Parse the request body
        const body = await req.json().catch(() => null);

        // Validate input
        if (!body || typeof body.input !== "string" || !body.input.trim()) {
            return new Response(
                JSON.stringify({ success: false, message: "Invalid or missing input" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Log received input
        console.log("Received input:", body.input);

        // Threat detection logic
        const threatDetected = detectThreat(body.input);

        // Respond based on detection result
        return new Response(
            JSON.stringify({
                success: true,
                threatDetected,
                message: threatDetected ? "Threat detected" : "No threats found",
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error in POST /api/threat-detection:", error);
        return new Response(
            JSON.stringify({ success: false, error: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}

function detectThreat(input) {
    const threatPatterns = ["virus", "malware", "phishing", "attack", "exploit"];
    for (const pattern of threatPatterns) {
        if (input.toLowerCase().includes(pattern)) {
            return true; // Threat detected
        }
    }
    return false; // No threat detected
}
