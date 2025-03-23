import { ethers } from 'ethers';

// Replace with your actual contract address
const contractAddress = '0x5C07f54dffB425Af92C3868216106046daE4Eee4';
const contractABI = [
    {
        inputs: [],
        name: 'getRandomAmount',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address payable',
                name: 'recipient',
                type: 'address',
            },
        ],
        name: 'sendRandomETH',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'withdraw',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
];

let provider: ethers.providers.Web3Provider;
let signer: ethers.Signer;
let contract: ethers.Contract;

export const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
        alert('Please install MetaMask!');
        return;
    }

    try {
        // Request access to the user's wallet
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        signer = provider.getSigner();
        contract = new ethers.Contract(contractAddress, contractABI, signer);
        console.log('Wallet connected');
    } catch (err) {
        console.error('Error connecting wallet:', err);
        alert('Error connecting wallet');
    }
};

export const getRandomAmount = async (): Promise<string | undefined> => {
    if (!contract) {
        alert('Please connect your wallet first!');
        return;
    }

    try {
        const amount = await contract.getRandomAmount();
        console.log('Random amount:', ethers.utils.formatEther(amount));
        return ethers.utils.formatEther(amount);
    } catch (err) {
        console.error('Error fetching random amount:', err);
    }
};

export const sendRandomETH = async (recipientAddress: string) => {
    if (!contract) {
        alert('Please connect your wallet first!');
        return;
    }

    try {
        const amount = await getRandomAmount();
        if (!amount) {
            alert('Error fetching random amount');
            return;
        }
        const tx = await contract.sendRandomETH(recipientAddress, { value: ethers.utils.parseEther(amount) });
        await tx.wait();
        console.log('Transaction complete!');
    } catch (err) {
        console.error('Error sending ETH:', err);
        alert('Error sending ETH');
    }
};
