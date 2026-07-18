import { useState } from 'react'
import './App.css'

function toNumber(value) {
  const n = parseFloat(value)
  return Number.isFinite(n) ? n : null
}

function formatCurrency(n) {
  return n.toLocaleString(undefined, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  })
}

function App() {
  const [netIncome, setNetIncome] = useState('')
  const [beginningEquity, setBeginningEquity] = useState('')
  const [endingEquity, setEndingEquity] = useState('')

  const netIncomeNum = toNumber(netIncome)
  const beginningEquityNum = toNumber(beginningEquity)
  const endingEquityNum = toNumber(endingEquity)

  const hasAllInputs =
    netIncomeNum !== null && beginningEquityNum !== null && endingEquityNum !== null

  const averageEquity = hasAllInputs
    ? (beginningEquityNum + endingEquityNum) / 2
    : null

  const equityInvalid = averageEquity !== null && averageEquity <= 0

  const roe =
    hasAllInputs && !equityInvalid ? (netIncomeNum / averageEquity) * 100 : null

  function handleReset() {
    setNetIncome('')
    setBeginningEquity('')
    setEndingEquity('')
  }

  return (
    <div className="page">
      <h1>Shareholders&rsquo; Return on Equity</h1>
      <p className="subtitle">
        ROE measures how efficiently a company generates profit from
        shareholders&rsquo; equity.
      </p>

      <form
        className="card"
        onSubmit={(e) => e.preventDefault()}
      >
        <label className="field">
          <span>Net Income</span>
          <input
            type="number"
            inputMode="decimal"
            placeholder="e.g. 250000"
            value={netIncome}
            onChange={(e) => setNetIncome(e.target.value)}
          />
        </label>

        <label className="field">
          <span>Beginning Shareholders&rsquo; Equity</span>
          <input
            type="number"
            inputMode="decimal"
            placeholder="e.g. 1000000"
            value={beginningEquity}
            onChange={(e) => setBeginningEquity(e.target.value)}
          />
        </label>

        <label className="field">
          <span>Ending Shareholders&rsquo; Equity</span>
          <input
            type="number"
            inputMode="decimal"
            placeholder="e.g. 1200000"
            value={endingEquity}
            onChange={(e) => setEndingEquity(e.target.value)}
          />
        </label>

        <button type="button" className="reset" onClick={handleReset}>
          Reset
        </button>
      </form>

      <section className="result">
        {equityInvalid && (
          <p className="error">
            Average shareholders&rsquo; equity must be greater than zero.
          </p>
        )}

        {!equityInvalid && roe !== null && (
          <>
            <span className="result-label">Return on Equity</span>
            <span className="result-value">{roe.toFixed(2)}%</span>
            <span className="result-detail">
              {formatCurrency(netIncomeNum)} net income &divide;{' '}
              {formatCurrency(averageEquity)} average equity
            </span>
          </>
        )}

        {!hasAllInputs && (
          <p className="hint">Enter all three values to calculate ROE.</p>
        )}
      </section>

      <footer className="formula">
        ROE = Net Income &divide; Average Shareholders&rsquo; Equity, where
        Average Equity = (Beginning Equity + Ending Equity) &divide; 2
      </footer>
    </div>
  )
}

export default App
