<script>
function modExp(base, exp, mod) {
    return Math.pow(base, exp) % mod;
}

function calculateDH() {
    let p = parseInt(document.getElementById("p").value);
    let g = parseInt(document.getElementById("g").value);
    let a = parseInt(document.getElementById("a").value);
    let b = parseInt(document.getElementById("b").value);

    let A = modExp(g, a, p);
    let B = modExp(g, b, p);
    let keyAlice = modExp(B, a, p);
    let keyBob = modExp(A, b, p);

    document.getElementById("output").innerHTML = `
        <b>Step 1: Public Values</b><br>
        p = ${p}, g = ${g}<br><br>

        <b>Step 2: Alice Public Key</b><br>
        A = g^a mod p<br>
        A = ${g}^${a} mod ${p} = ${A}<br><br>

        <b>Step 3: Bob Public Key</b><br>
        B = g^b mod p<br>
        B = ${g}^${b} mod ${p} = ${B}<br><br>

        <b>Step 4: Alice Computes Shared Key</b><br>
        K = B^a mod p<br>
        K = ${B}^${a} mod ${p} = ${keyAlice}<br><br>

        <b>Step 5: Bob Computes Shared Key</b><br>
        K = A^b mod p<br>
        K = ${A}^${b} mod ${p} = ${keyBob}<br><br>

        <b>✔ Shared Secret Key = ${keyAlice}</b>
    `;
}
</script>
