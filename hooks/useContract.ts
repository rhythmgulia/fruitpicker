"use client"

import { useState, useEffect } from "react"
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { contractABI, contractAddress } from "@/lib/contract"

export interface ContractData {
  fruits: string[]
  lastPickedFruit: string
  pickedCount: number
}

export interface ContractState {
  isLoading: boolean
  isPending: boolean
  isConfirming: boolean
  isConfirmed: boolean
  hash: `0x${string}` | undefined
  error: Error | null
}

export interface ContractActions {
  pickFruit: () => Promise<void>
}

export const useFruitContract = () => {
  const { address } = useAccount()

  const { data: fruits, refetch: refetchFruits } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "getFruits"
  })

  const { data: lastPicked } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "lastPickedFruit",
    args: [address!],
    query: { enabled: !!address }
  })

  const { data: pickedCount } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "pickedCount",
    args: [address!],
    query: { enabled: !!address }
  })

  const { writeContractAsync, data: hash, error, isPending } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash })

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isConfirmed) {
      refetchFruits()
    }
  }, [isConfirmed, refetchFruits])

  const pickFruit = async () => {
    try {
      setIsLoading(true)
      await writeContractAsync({
        address: contractAddress,
        abi: contractABI,
        functionName: "pickFruit"
      })
    } catch (err) {
      console.error("Error picking fruit:", err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const data: ContractData = {
    fruits: fruits ? (fruits as string[]) : [],
    lastPickedFruit: lastPicked ? (lastPicked as string) : "",
    pickedCount: pickedCount ? Number(pickedCount as bigint) : 0
  }

  const actions: ContractActions = { pickFruit }

  const state: ContractState = {
    isLoading: isLoading || isPending || isConfirming,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
    error
  }

  return { data, actions, state }
}
