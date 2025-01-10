import  {ethers} from 'ethers';
import ABI from "./Smartcontract.abi.json"

declare global {
    interface Window {
        ethereum?: any;
    }
}

interface Seller {
    wallet: string;
    balance: string;
}



// Typowanie dla kontraktu
interface CryptoShopContract {
    registerSeller: (sellerId: string, wallet: string) => Promise<boolean>;
    buyProduct: (sellerId: string, amount: string) => Promise<boolean>;
    withdrawFunds: (sellerId: string) => Promise<void>;
    checkBalance: (sellerId: string) => Promise<string>;
}

// Adres wdrożonego kontraktu
const contractAddress = '0xED77a44706A85A11E19604d8D03Ba9997f096a18';



async function getContract(): Promise<ethers.Contract | null> {
    let signer = null
    if (window.ethereum !==null) {
        let provider = new ethers.BrowserProvider(window.ethereum)
        signer = await provider.getSigner();;
        return new ethers.Contract(contractAddress, ABI, signer);
    } else {
        console.error("MetaMask is not installed");
        return null;
    }
}

export async function getUserWalletAddress() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        
        return accounts[0];
      } catch (error) {
        console.error('Error getting wallet address:', error);
        return null;
      }
    } else {
      console.log('MetaMask is not installed');
      return null;
    }
  }

// Implementacja funkcji interakcji z kontraktem
const blockchainService: CryptoShopContract = {
    // Rejestracja sprzedawcy
    async registerSeller(sellerId: string, wallet: string) {
        const contract = await getContract();
        if (contract) {
            try {
                const tx = await contract.registerSeller(sellerId, wallet);
                await tx.wait(); // Czekanie na potwierdzenie transakcji
                
                return true
            } catch (error) {
                console.error("Błąd podczas rejestrowania sprzedawcy:", error);
                return false
            }
        }
        return false
    },

    // kupno produktu productPrice:number,currentEthPrice:number ogarniemy w funkcji wyzej
    async buyProduct(sellerId: string, amount: string) {
        const contract = await getContract();
        if (contract) {
            try {
                const tx = await contract.deposit(sellerId, {
                    value: ethers.parseEther(amount),
                });
                await tx.wait();
                
                return true
            } catch (error) {
                console.error("Błąd podczas wpłacania środków:", error);
                return false
            }
        }
        return false
    },

    // Wypłata środków
    async withdrawFunds(sellerId: string) {
        const contract = await getContract();
        if (contract) {
            try {
                const tx = await contract.withdraw(sellerId);
                await tx.wait();
                
            } catch (error) {
                console.error("Błąd podczas wypłaty środków:", error);
            }
        }
    },

    // Sprawdzenie stanu konta
    async checkBalance(sellerId: string): Promise<string> {
        const contract = await getContract();
        if (contract) {
            try {
                const balance = await contract.checkBalance(sellerId);
                return ethers.formatEther(balance);
            } catch (error) {
                console.error("Błąd podczas sprawdzania salda:", error);
            }
        }
        return "0";
    },
};

export default blockchainService;
