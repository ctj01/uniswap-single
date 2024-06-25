import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import { int } from 'hardhat/internal/core/params/argumentTypes';

type Token = { name: string, value: string, icons: string }
interface ExchangeFieldProps {
    value: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    currency: string;
    tokens: Token[];
    onCurrencyChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
    label?: string;
}


const ExchangeField = ({ value, onChange, currency, tokens, onCurrencyChange, label, } : ExchangeFieldProps) => {          // 1
    return (
        <div className='flex flex-row items-end border-solid border-2 border-gray-200 rounded  p-3 justify-between mt-5'>
            <div className='swap-box'>
                <TextField  onChange={onChange} defaultValue={value} label={label} variant="standard" InputProps={{
                disableUnderline: true,
            }} fullWidth>
            </TextField>
        </div>
        <div className='swap-box' style={{ width: "25%" }} >
            <TextField  onChange={onCurrencyChange} defaultValue={currency} select variant="standard" InputProps={{
                disableUnderline: true,
            }} fullWidth>
                {tokens.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        <div className='flex flex-row'>
                            <img width="20" src={option.icons} alt={option.name} className='icon' />
                            <Grid container spacing={2}>
                                <Grid item>
                                    {option.name}
                                </Grid>
                            </Grid>
                        </div>
                    </MenuItem>
                ))}
            </TextField>
        </div>
    </div>
    )
}

export default ExchangeField;