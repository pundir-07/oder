export async function sendOTP(phone: string) {
    const res = await fetch("/api/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
    });

    const data = await res.json();
    if (data.success) {
        alert(`OTP sent successfully!`);
    } else {
        alert(`Failed to send OTP: ${data.error}`);
    }
}
