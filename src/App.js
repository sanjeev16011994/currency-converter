import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  TextField,
  MenuItem,
  Typography,
  Button,
} from "@mui/material";
import CurrencyConverterImage from "./images/exchange.png";
import { CURRENCY_CODE } from "./currency_code";

function App() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const convertCurrency = () => {
    const from = fromCurrency.toLowerCase();
    const to = toCurrency.toLowerCase();
    const BASE_URL = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}/${to}.json`;
    setLoading(true);
    fetch(BASE_URL)
      .then((response) => response.json())
      .then((data) => {
        setConvertedAmount(amount * data[toCurrency.toLowerCase()]);
      })
      .catch((error) => console.error("Error fetching exchange rates:", error))
      .finally(() => {
        setLoading(false);
      });
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleFromCurrencyChange = (event) => {
    setFromCurrency(event.target.value);
  };

  const handleToCurrencyChange = (event) => {
    setToCurrency(event.target.value);
  };

  return (
    <Container>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        style={{ marginTop: "50px" }}
      >
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
                justifyContent:'center'
              }}
            >
              <img
                src={CurrencyConverterImage}
                alt="Currency Converter"
                style={{ marginRight: "10px", height: "50px" }}
              />
              <Typography variant="h5" gutterBottom  >
                Currency Converter
              </Typography>
            </div>
            <TextField
              label="Amount"
              type="number"
              variant="outlined"
              fullWidth
              value={amount}
              onChange={handleAmountChange}
            />
            <TextField
              select
              label="From"
              variant="outlined"
              fullWidth
              value={fromCurrency}
              onChange={handleFromCurrencyChange}
              style={{ marginTop: "20px" }}
            >
              {CURRENCY_CODE?.map(({ Currency, Code }) => (
                <MenuItem key={Code} value={Code}>
                  {Currency}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="To"
              variant="outlined"
              fullWidth
              value={toCurrency}
              onChange={handleToCurrencyChange}
              style={{ marginTop: "20px" }}
            >
              {CURRENCY_CODE?.map(({ Currency, Code }) => (
                <MenuItem key={Code} value={Code}>
                  {Currency}
                </MenuItem>
              ))}
            </TextField>
            <Button
              variant="contained"
              color="primary"
              onClick={convertCurrency}
              style={{ marginTop: "20px" }}
              disabled={loading}
              fullWidth
            >
              Convert
            </Button>
            <Typography variant="h6" style={{ marginTop: "20px" }}>
              {convertedAmount !== ""
                ? `Converted Amount: ${convertedAmount} ${toCurrency}`
                : "Enter a valid amount"}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
