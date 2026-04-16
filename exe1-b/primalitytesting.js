<script>
  
    function calcStdGCD() {
        let a = Math.abs(parseInt(document.getElementById('sNum1').value));
        let b = Math.abs(parseInt(document.getElementById('sNum2').value));
        if (isNaN(a) || isNaN(b)) return;
        
        let gcd = 1;
        for (let i = 1; i <= Math.min(a, b); i++) {
            if (a % i === 0 && b % i === 0) gcd = i;
        }
        document.getElementById('sRes').innerText = "GCD: " + gcd;
    }

    function calcEucGCD() {
        let a = Math.abs(parseInt(document.getElementById('eNum1').value));
        let b = Math.abs(parseInt(document.getElementById('eNum2').value));
        if (isNaN(a) || isNaN(b)) return;

        while (b !== 0) {
            let temp = b;
            b = a % b;
            a = temp;
        }
        document.getElementById('eRes').innerText = "GCD: " + a;
    }

 
    function powerMod(base, exp, mod) {
        let res = 1n;
        base = base % mod;
        while (exp > 0n) {
            if (exp % 2n === 1n) res = (res * base) % mod;
            base = (base * base) % mod;
            exp = exp / 2n;
        }
        return res;
    }

    function millerTest(d, n) {

        let a = 2n + BigInt(Math.floor(Math.random() * Number(n - 4n)));
        let x = powerMod(a, d, n);
        if (x === 1n || x === n - 1n) return true;
        while (d !== n - 1n) {
            x = (x * x) % n;
            d *= 2n;
            if (x === 1n) return false;
            if (x === n - 1n) return true;
        }
        return false;
    }

    function isPrime(n, k = 5) {
        if (n <= 1n || n === 4n) return false;
        if (n <= 3n) return true;
        let d = n - 1n;
        while (d % 2n === 0n) d /= 2n;
        for (let i = 0; i < k; i++) {
            if (!millerTest(d, n)) return false;
        }
        return true;
    }

    function calcMiller() {
        try {
            let val = document.getElementById('mNum').value.trim();
            if(!val) return;
            let n = BigInt(val);
            let result = isPrime(n) ? "PROBABLY PRIME" : "COMPOSITE";
            document.getElementById('mRes').innerText = result;
        } catch(e) {
            document.getElementById('mRes').innerText = "Invalid Input";
        }
    }
</script>
