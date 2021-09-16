import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
  },
})

export default function Create() {
  const classes = useStyles()
  const [note, setNotes] = useState('')
  const [details, setDetails] = useState('')
  const [errorNote, setErrorNote] = useState(false)
  const [errorDetails, setErrorDetails] = useState(false)
  const [category, setCategory] = useState('money')

  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()

    setErrorNote(false)
    setErrorDetails(false)

    if (note === '') {
      setErrorNote(true)
    }
    if (details === '') {
      setErrorDetails(true)
    }
    if (note && details) {
      fetch('http://localhost:8000/notes', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ note, details, category }),
      }).then(() => history.push('/'))
    }
  }

  return (
    <Container>
      <Typography
        variant='h6'
        component='h2'
        // color='TextSecondary'
        gutterBottom //adds margin botoom
      >
        Create add Page
      </Typography>

      <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <TextField
          label='Note title'
          className={classes.field}
          onChange={(e) => setNotes(e.target.value)}
          error={errorNote}
          variant='outlined'
          fullWidth
          required
        ></TextField>
        <TextField
          label='Details'
          variant='outlined'
          onChange={(e) => setDetails(e.target.value)}
          fullWidth
          multiline
          rows={4}
          required
          error={errorDetails}
          className={classes.field}
        ></TextField>
        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel value='money' control={<Radio />} label='Money' />
            <FormControlLabel value='todos' control={<Radio />} label='Todos' />
            <FormControlLabel
              value='reminders'
              control={<Radio />}
              label='Reminders'
            />
            <FormControlLabel value='work' control={<Radio />} label='Work' />
          </RadioGroup>
        </FormControl>
        <Button
          variant='contained'
          color='secondary'
          type='submit'
          // startIcon={<KeyboardArrowRightIcon />}
          endIcon={<KeyboardArrowRightIcon />}
        >
          submit
        </Button>
      </form>
    </Container>
  )
}
