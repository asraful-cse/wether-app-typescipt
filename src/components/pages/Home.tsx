import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Home: React.FC = () => {
  const history = useHistory()
  const [countryName, setCountryName] = useState<string>('')
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountryName(event.target.value)
  }
  const onSubmit = () => {
    history.push(`/country/${countryName}`)
  }
  return (
    <div
      data-testid="home"
      style={{ marginRight: '40px', textAlign: 'center' }}
    >
      <h4>Welcome to weather application</h4>
      <div>
        <TextField
          variant="standard"
          placeholder="Enter country name"
          value={countryName}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Button
          size="medium"
          variant="contained"
          disabled={!countryName}
          onClick={onSubmit}
          style={{ width: '210px', marginTop: '20px' }}
        >
          Submit
        </Button>
      </div>
    </div>
  )
}

export default Home
