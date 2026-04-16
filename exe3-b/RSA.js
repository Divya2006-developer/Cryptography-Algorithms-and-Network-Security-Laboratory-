
<script>
function gcd(a,b){
    while(b!=0){ let t=b; b=a%b; a=t; }
    return a;
}

function modInverse(e,phi){
    for(let d=1; d<phi; d++){
        if((e*d)%phi==1) return d;
    }
}

function modExp(base,exp,mod){
    return Math.pow(base,exp)%mod;
}

function calculateRSA(){
    let p = parseInt(document.getElementById("p").value);
    let q = parseInt(document.getElementById("q").value);
    let msg = parseInt(document.getElementById("msg").value);

    let n = p*q;
    let phi = (p-1)*(q-1);

    let e;
    for(e=2; e<phi; e++){
        if(gcd(e,phi)==1) break;
    }

    let d = modInverse(e,phi);

    let cipher = modExp(msg,e,n);
    let decrypted = modExp(cipher,d,n);

    output.innerHTML = `
    <b>Step 1:</b> Compute n<br>
    n = p × q = ${p} × ${q} = ${n}<br><br>

    <b>Step 2:</b> Compute φ(n)<br>
    φ(n) = (p-1)(q-1) = ${p-1} × ${q-1} = ${phi}<br><br>

    <b>Step 3:</b> Choose e such that gcd(e, φ) = 1<br>
    e = ${e}<br><br>

    <b>Step 4:</b> Find d such that (d × e) mod φ = 1<br>
    d = ${d}<br><br>

    <b>Step 5:</b> Encryption<br>
    Cipher = M^e mod n<br>
    = ${msg}^${e} mod ${n} = ${cipher}<br><br>

    <b>Step 6:</b> Decryption<br>
    M = Cipher^d mod n<br>
    = ${cipher}^${d} mod ${n} = ${decrypted}<br><br>

    <b>Final Decrypted Message:</b> ${decrypted}
    `;
}
</script>

