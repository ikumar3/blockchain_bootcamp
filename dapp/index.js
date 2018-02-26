let abi = JSON.parse('[\n' +
    '\t{\n' +
    '\t\t"constant": true,\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"name": "",\n' +
    '\t\t\t\t"type": "bytes32"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "votesReceived",\n' +
    '\t\t"outputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"name": "",\n' +
    '\t\t\t\t"type": "uint8"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"payable": false,\n' +
    '\t\t"stateMutability": "view",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"constant": true,\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"name": "candidate",\n' +
    '\t\t\t\t"type": "bytes32"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "validCandidate",\n' +
    '\t\t"outputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"name": "",\n' +
    '\t\t\t\t"type": "bool"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"payable": false,\n' +
    '\t\t"stateMutability": "view",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"constant": true,\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"name": "candidate",\n' +
    '\t\t\t\t"type": "bytes32"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "totalVotesFor",\n' +
    '\t\t"outputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"name": "",\n' +
    '\t\t\t\t"type": "uint8"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"payable": false,\n' +
    '\t\t"stateMutability": "view",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"constant": true,\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"name": "",\n' +
    '\t\t\t\t"type": "uint256"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "candidateList",\n' +
    '\t\t"outputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"name": "",\n' +
    '\t\t\t\t"type": "bytes32"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"payable": false,\n' +
    '\t\t"stateMutability": "view",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"constant": false,\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"name": "candidate",\n' +
    '\t\t\t\t"type": "bytes32"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "voteForCandidate",\n' +
    '\t\t"outputs": [],\n' +
    '\t\t"payable": false,\n' +
    '\t\t"stateMutability": "nonpayable",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"name": "candidateNames",\n' +
    '\t\t\t\t"type": "bytes32[]"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"payable": false,\n' +
    '\t\t"stateMutability": "nonpayable",\n' +
    '\t\t"type": "constructor"\n' +
    '\t}\n' +
    ']');
let VotingContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
let contractInstance = VotingContract.at('0xb60f44dbf7c99b4921e8365cb6b529627cd8e324');
let candidates = {"rohan": "candidate-1", "kunal": "candidate-2", "tauseef": "candidate-3"};

function voteForCandidate(candidate) {
    candidateName = $("#candidate").val();
    try {
        contractInstance.voteForCandidate(candidateName, {from: web3.eth.accounts[0]}, function() {
            let div_id = candidates[candidateName];
            contractInstance.totalVotesFor(candidateName, function (err,res) {
                // console.log(res);
                $("#" + div_id).html(res.toString());
            });
            // $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
        });
    } catch (err) {
    }
}

$(document).ready(function() {
    candidateNames = Object.keys(candidates);
    for (var i = 0; i < candidateNames.length; i++) {
        let name = candidateNames[i];
        // var _res;
        contractInstance.totalVotesFor.call(name, function (err,res) {
            // console.log(res.toString());
            $("#" + candidates[name]).html(res.toString());
        });
    }
});