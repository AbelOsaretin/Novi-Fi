import { Transaction } from "@/types";

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    name: "Ethereum",
    symbol: "ETH",
    icon: "/assets/image/ethereum.png?height=40&width=40",
    price: 3900,
    changePercentage: 1.23,
    tokenAmount: 2.32,
    balanceUSD: 6911.70
  },
  {
    id: "2",
    name: "USD Coin",
    symbol: "USDC",
    icon: "/assets/image/usdc.png?height=40&width=40",
    price: 1.01,
    changePercentage: 0.09,
    tokenAmount: 2000.01,
    balanceUSD: 2000.04
  },
  {
    id: "3",
    name: "ApeCoin",
    symbol: "APE",
    icon: "/assets/image/APE.png?height=40&width=40",
    price: 3.33,
    changePercentage: -5.22,
    tokenAmount: 452.23,
    balanceUSD: 1370.65
  },
  {
    id: "4",
    name: "Avalanche",
    symbol: "AVAX",
    icon: "/assets/image/avalanche.png?height=40&width=40",
    price: 9.13,
    changePercentage: 0.09,
    tokenAmount: 259.02,
    balanceUSD: 245.89
  },
  {
    id: "5",
    name: "DogeCoin",
    symbol: "DOGE",
    icon: "/assets/image/dodge.png?height=40&width=40",
    price: 0.52,
    changePercentage: 0.09,
    tokenAmount: 322002.02,
    balanceUSD: 188.61
  },
  {
    id: "6",
    name: "AAVE",
    symbol: "AAVE",
    icon: "/assets/image/aave.png?height=40&width=40",
    price: 65.21,
    changePercentage: 1.32,
    tokenAmount: 1.77,
    balanceUSD: 89.32
  }
];
