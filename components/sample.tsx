"use client"

import { useAccount } from "wagmi"
import { useFruitContract } from "@/hooks/useContract"

const SampleIntregation = () => {
  const { isConnected } = useAccount()
  const { data, actions, state } = useFruitContract()

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-bold mb-3">FruitPicker</h2>
          <p className="text-muted-foreground">Connect your wallet to start picking fruits!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-xl mx-auto space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">FruitPicker</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Pick random fruits directly from the blockchain!
          </p>
        </div>

        <div className="bg-card border p-4 rounded-lg">
          <p className="text-xs text-muted-foreground uppercase mb-2">Your Last Pick</p>
          <p className="text-xl font-semibold">{data.lastPickedFruit || "No fruit picked yet"}</p>
        </div>

        <div className="bg-card border p-4 rounded-lg">
          <p className="text-xs text-muted-foreground uppercase mb-2">Total Fruits Picked</p>
          <p className="text-xl font-semibold">{data.pickedCount}</p>
        </div>

        <button
          onClick={actions.pickFruit}
          disabled={state.isLoading || state.isPending}
          className="w-full px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
        >
          {state.isLoading || state.isPending ? "Picking..." : "Pick a Fruit"}
        </button>

        {state.hash && (
          <div className="p-4 bg-card border rounded-lg mt-4">
            <p className="text-xs uppercase text-muted-foreground mb-2">Transaction Hash</p>
            <p className="text-sm break-all">{state.hash}</p>
            {state.isConfirming && <p className="text-primary text-sm">Waiting for confirmation...</p>}
            {state.isConfirmed && <p className="text-green-500 text-sm">Fruit picked successfully!</p>}
          </div>
        )}

        {state.error && (
          <div className="p-4 bg-card border border-destructive rounded-lg">
            <p className="text-sm text-destructive-foreground">Error: {state.error.message}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SampleIntregation
