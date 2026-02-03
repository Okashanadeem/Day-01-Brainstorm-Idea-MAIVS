/**
 * Validates a 15-digit IMEI using the Luhn Algorithm.
 * Usage: node validate_imei.cjs <imei>
 */

function validateIMEI(imei) {
  if (!/^\d{15}$/.test(imei)) {
    return { valid: false, reason: "Must be exactly 15 digits." };
  }

  let sum = 0;
  for (let i = 0; i < 15; i++) {
    let digit = parseInt(imei[i]);
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }

  const valid = sum % 10 === 0;
  return {
    valid: valid,
    reason: valid ? "Valid IMEI" : "Failed Luhn check."
  };
}

const input = process.argv[2];
if (!input) {
  console.log(JSON.stringify({ error: "No IMEI provided" }));
  process.exit(1);
}

const result = validateIMEI(input);
console.log(JSON.stringify(result, null, 2));
