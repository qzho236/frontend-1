import React, { useState } from 'react';
import {
  Button,
  Stack,
  Typography,
  Link,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './UploadPage.module.css';
import { uploadTimetableURL } from '../../api/TimetableAPI';
import UploadPopUp from '../../components/UploadPopUp/UploadPopUp';


/**
 * This component can be used to display the upload page for the app after the user has logged in.
 * Users can input their timetable details into this page. Currenly the page is not functional.
 * This component takes in a function as a prop that should handle the behaviour of a user clicking on the submit button.
 *
 */
export default function UploadPage() {
  const [open, setOpen] = useState(false);
  const [calendarURL, setCalendarURL] = useState('');
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setCalendarURL(event.target.value);
  };
  /**
   * submit the timetable generated by url
   */
  const handleSubmit = () => {
    const upload = async () => {
      try {
        await uploadTimetableURL(calendarURL);
        navigate('/find-matches');
      } catch (err) {
        setCalendarURL('');
        setDisable(false);
      }
    };
    setDisable(true);
    upload();
  };

  /**
   * open and close the upload timetable popup compoenent
   */
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Stack direction="column" spacing={3} className={styles.title}>
      <Button variant="contained" onClick={handleClickOpen} className={styles.uploadButton}>
        <b className={styles.textColour}>Upload Timetable ICS File</b>
      </Button>

      <UploadPopUp open={open} close={handleClose}  />
      <Typography><b>OR</b></Typography>
      <FormControl>
        <InputLabel><b className={styles.textColour}>Input your timetable URL...</b></InputLabel>
        <OutlinedInput
          className={styles.textBox}
          id="outlined-input"
          aria-label="Enter URL"
          disabled={disable}
          value={calendarURL}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <Button
                variant="contained"
                aria-label="submit"
                onClick={handleSubmit}
                sx={{
                  borderRadius: '30px',
                  padding: '10px',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  borderWidth: '1px',
                }}> 
                  <b className={styles.textColour}>Submit</b>
                </Button>
            </InputAdornment>
          }
        />
      </FormControl>

      <Link
        href="https://uoacal.auckland.ac.nz/home"
        underline="hover"
        target="_blank"
        rel="noopener noreferrer">
        <Typography>Download your timetable at https://uoacal.auckland.ac.nz/home</Typography>
      </Link>
    </Stack>
  );
}
