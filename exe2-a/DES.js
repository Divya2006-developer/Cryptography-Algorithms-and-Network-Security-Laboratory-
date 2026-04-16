<script>
function permute(bits, table){
    return table.map(i => bits[i-1]).join('');
}
function leftShift(bits, n){
    return bits.slice(n)+bits.slice(0,n);
}
function xor(a,b){
    let res="";
    for(let i=0;i<a.length;i++)
        res+=(a[i]===b[i])?'0':'1';
    return res;
}
function parseTable(id){
    return document.getElementById(id).value.trim().split(/\s+/).map(Number);
}

function parseSBox(id){
    let values=document.getElementById(id).value.trim().split(/\s+/).map(Number);
    return [
        values.slice(0,4),
        values.slice(4,8),
        values.slice(8,12),
        values.slice(12,16)
    ];
}

function sboxProcess(input, box, name, outputText){
    let row=parseInt(input[0]+input[3],2);
    let col=parseInt(input[1]+input[2],2);
    let val=box[row][col];
    outputText+="\n"+name+" Input: "+input;
    outputText+="\nRow: "+row+" Col: "+col;
    outputText+="\n"+name+" Output: "+val+" ("+val.toString(2).padStart(2,'0')+")\n";
    return val.toString(2).padStart(2,'0');
}

function encrypt(){

let output="";
let plaintext=document.getElementById("plaintext").value;
let key=document.getElementById("key").value;

let P10=parseTable("p10");
let P8=parseTable("p8");
let IP=parseTable("ip");
let IP_inv=parseTable("ip_inv");
let EP=parseTable("ep");
let P4=parseTable("p4");

let S0=parseSBox("s0");
let S1=parseSBox("s1");

output+="===== KEY GENERATION =====\n";

let p10=permute(key,P10);
output+="P10: "+p10+"\n";

let left=p10.slice(0,5);
let right=p10.slice(5);

output+="Split: L="+left+" R="+right+"\n";

left=leftShift(left,1);
right=leftShift(right,1);

output+="After LS-1: L="+left+" R="+right+"\n";

let K1=permute(left+right,P8);
output+="K1: "+K1+"\n";

left=leftShift(left,2);
right=leftShift(right,2);

output+="After LS-2: L="+left+" R="+right+"\n";

let K2=permute(left+right,P8);
output+="K2: "+K2+"\n";

output+="\n===== INITIAL PERMUTATION =====\n";

let ip=permute(plaintext,IP);
output+="IP: "+ip+"\n";

let L=ip.slice(0,4);
let R=ip.slice(4);

output+="L0="+L+" R0="+R+"\n";

output+="\n===== ROUND 1 =====\n";

let ep=permute(R,EP);
output+="EP: "+ep+"\n";

let xor1=xor(ep,K1);
output+="XOR with K1: "+xor1+"\n";

let leftS=xor1.slice(0,4);
let rightS=xor1.slice(4);

let s0out=sboxProcess(leftS,S0,"S0",output);
let s1out=sboxProcess(rightS,S1,"S1",output);

let sOut=s0out+s1out;
output+="Combined S-Box Output: "+sOut+"\n";

let p4=permute(sOut,P4);
output+="P4: "+p4+"\n";

let L1=xor(L,p4);
output+="L0 XOR P4: "+L1+"\n";

output+="After Swap: L="+R+" R="+L1+"\n";

L=R;
R=L1;

output+="\n===== ROUND 2 =====\n";

ep=permute(R,EP);
output+="EP: "+ep+"\n";

let xor2=xor(ep,K2);
output+="XOR with K2: "+xor2+"\n";

leftS=xor2.slice(0,4);
rightS=xor2.slice(4);

s0out=sboxProcess(leftS,S0,"S0",output);
s1out=sboxProcess(rightS,S1,"S1",output);

sOut=s0out+s1out;
output+="Combined S-Box Output: "+sOut+"\n";

p4=permute(sOut,P4);
output+="P4: "+p4+"\n";

let L2=xor(L,p4);
output+="L1 XOR P4: "+L2+"\n";

let preoutput=L2+R;
output+="Preoutput: "+preoutput+"\n";

output+="\n===== FINAL PERMUTATION =====\n";

let cipher=permute(preoutput,IP_inv);
output+="Ciphertext: "+cipher+"\n";

document.getElementById("output").textContent=output;

}

</script>
