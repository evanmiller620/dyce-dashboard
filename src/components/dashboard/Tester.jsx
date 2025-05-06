import React, { useMemo, useState } from 'react'
import Dyce from "../../../../dyce"

export const Tester = () => {
  const [apiKey, setApiKey] = useState("");
  const [wallet, setWallet] = useState("");
  const [amount, setAmount] = useState(0);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dyce = useMemo(() => new Dyce(apiKey), [apiKey]);

  const onApprove = async () => {
    setError("");
    setLoading(true);
    const success = await dyce.permitSpending(userId, amount);
    if (!success) setError("Failed to approve spending!");
    setLoading(false);
  }

  const onTransfer = async () => {
    setError("");
    setLoading(true);
    const success = await dyce.receivePayment(amount);
    if (!success) setError("Failed to transfer tokens");
    setLoading(false);
  }

  const onRequest = async () => {
    setError("");
    setLoading(true);
    const success = await dyce.requestPayment(userId, amount);
    if (!success) setError("Failed to execute payment!");
    setLoading(false);
  }

  return (
    <div className='manager tester-wrapper'>
      <div className='header-container'>
        <h1>API Test</h1>
      </div>
      <div className='row'>
        <input type='text' placeholder='API Key' onChange={e => setApiKey(e.target.value)}></input>
        <button onClick={() => setWallet(dyce.getWalletAddress())}>Get Wallet Address</button>
        <p>{wallet}</p>
        <input type='text' placeholder='User ID' onChange={e => setUserId(e.target.value)}></input>
        <input type='number' placeholder='Amount' onChange={e => setAmount(e.target.value)}></input>
        <button onClick={onApprove} disabled={loading}>Approve Spending</button>
        <button onClick={onRequest} disabled={loading}>Request Payment</button>
        <button onClick={onTransfer} disabled={loading}>One Time Pay</button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  )
}