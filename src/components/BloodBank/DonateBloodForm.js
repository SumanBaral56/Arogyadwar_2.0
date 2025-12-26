import React, { useState } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Stepper,
  Step,
  StepLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  MenuItem,
  Alert,
  Card,
  CardContent,
  Checkbox,
  Divider,
} from '@mui/material';
import {
  ArrowForward,
  ArrowBack,
  CheckCircle,
  LocalHospital,
} from '@mui/icons-material';

const DonateBloodForm = ({ onBack }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    // Step 1
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    address: '',
    
    // Step 2
    weight: '',
    height: '',
    lastDonation: '',
    hasTattoo: false,
    hasSurgery: false,
    hasDisease: false,
    diseaseDetails: '',
    
    // Step 3
    preferredDate: '',
    preferredTime: '',
    donationCenter: '',
    emergencyContact: '',
    
    // Step 4
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const steps = ['Personal Info', 'Health Check', 'Schedule', 'Confirm'];

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const donationCenters = [
    'Arogyadwar Main Center - Mumbai',
    'Arogyadwar North Center - Delhi',
    'Arogyadwar South Center - Bangalore',
    'Arogyadwar East Center - Kolkata',
    'Arogyadwar West Center - Pune',
  ];

  const handleNext = () => {
    if (validateStep()) {
      if (activeStep === steps.length - 1) {
        handleSubmit();
      } else {
        setActiveStep(prev => prev + 1);
      }
    }
  };

  const handleBack = () => {
    if (activeStep === 0 && onBack) {
      onBack();
    } else {
      setActiveStep(prev => prev - 1);
    }
  };

  const validateStep = () => {
    const newErrors = {};
    
    switch (activeStep) {
      case 0:
        if (!formData.fullName.trim()) newErrors.fullName = 'Required';
        if (!formData.email.trim()) newErrors.email = 'Required';
        if (!formData.phone.trim()) newErrors.phone = 'Required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Required';
        if (!formData.bloodGroup) newErrors.bloodGroup = 'Required';
        break;
      case 1:
        if (!formData.weight || formData.weight < 50) newErrors.weight = 'Minimum 50 kg required';
        break;
      case 2:
        if (!formData.preferredDate) newErrors.preferredDate = 'Required';
        if (!formData.donationCenter) newErrors.donationCenter = 'Required';
        break;
      case 3:
        if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = () => {
    console.log('Donor registration submitted:', formData);
    setSubmitted(true);
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (submitted) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <CheckCircle sx={{ fontSize: 80, color: '#4caf50', mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Thank You for Registering!
        </Typography>
        <Typography variant="body1" paragraph>
          You have been successfully registered as a blood donor.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Appointment Details:</strong>
        </Typography>
        <Card variant="outlined" sx={{ mb: 3, textAlign: 'left' }}>
          <CardContent>
            <Typography><strong>Date:</strong> {formData.preferredDate}</Typography>
            <Typography><strong>Center:</strong> {formData.donationCenter}</Typography>
            <Typography><strong>Blood Group:</strong> {formData.bloodGroup}</Typography>
          </CardContent>
        </Card>
        <Button
          variant="contained"
          onClick={onBack}
        >
          Back to Blood Bank
        </Button>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">
          Register as Blood Donor
        </Typography>
        <Button onClick={onBack} variant="outlined">
          Back to Overview
        </Button>
      </Box>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              error={!!errors.fullName}
              helperText={errors.fullName}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              error={!!errors.dateOfBirth}
              helperText={errors.dateOfBirth}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl component="fieldset">
              <FormLabel>Gender</FormLabel>
              <RadioGroup row name="gender" value={formData.gender} onChange={handleChange}>
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Blood Group"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              error={!!errors.bloodGroup}
              helperText={errors.bloodGroup}
              required
            >
              <MenuItem value="">Select</MenuItem>
              {bloodGroups.map(group => (
                <MenuItem key={group} value={group}>{group}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              multiline
              rows={2}
            />
          </Grid>
        </Grid>
      )}

      {activeStep === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Weight (kg)"
              name="weight"
              type="number"
              value={formData.weight}
              onChange={handleChange}
              error={!!errors.weight}
              helperText={errors.weight || "Minimum 50 kg required"}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Height (cm)"
              name="height"
              type="number"
              value={formData.height}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>
              Health History
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  name="hasTattoo"
                  checked={formData.hasTattoo}
                  onChange={handleChange}
                />
              }
              label="Tattoo/Piercing in last 6 months"
            />
            <br />
            <FormControlLabel
              control={
                <Checkbox
                  name="hasSurgery"
                  checked={formData.hasSurgery}
                  onChange={handleChange}
                />
              }
              label="Surgery in last 6 months"
            />
            <br />
            <FormControlLabel
              control={
                <Checkbox
                  name="hasDisease"
                  checked={formData.hasDisease}
                  onChange={handleChange}
                />
              }
              label="Any chronic diseases"
            />
          </Grid>
        </Grid>
      )}

      {activeStep === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Preferred Date"
              name="preferredDate"
              type="date"
              value={formData.preferredDate}
              onChange={handleChange}
              error={!!errors.preferredDate}
              helperText={errors.preferredDate}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Preferred Time"
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleChange}
            >
              <MenuItem value="09:00-11:00">09:00 AM - 11:00 AM</MenuItem>
              <MenuItem value="11:00-13:00">11:00 AM - 01:00 PM</MenuItem>
              <MenuItem value="14:00-16:00">02:00 PM - 04:00 PM</MenuItem>
              <MenuItem value="16:00-18:00">04:00 PM - 06:00 PM</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="Donation Center"
              name="donationCenter"
              value={formData.donationCenter}
              onChange={handleChange}
              error={!!errors.donationCenter}
              helperText={errors.donationCenter}
              required
            >
              <MenuItem value="">Select Center</MenuItem>
              {donationCenters.map(center => (
                <MenuItem key={center} value={center}>{center}</MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      )}

      {activeStep === 3 && (
        <Box>
          <Alert severity="info" sx={{ mb: 3 }}>
            Please review your information before submitting.
          </Alert>
          
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Registration Summary</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}><strong>Name:</strong> {formData.fullName}</Grid>
                <Grid item xs={6}><strong>Blood Group:</strong> {formData.bloodGroup}</Grid>
                <Grid item xs={6}><strong>Phone:</strong> {formData.phone}</Grid>
                <Grid item xs={6}><strong>Date:</strong> {formData.preferredDate}</Grid>
                <Grid item xs={12}><strong>Center:</strong> {formData.donationCenter}</Grid>
              </Grid>
            </CardContent>
          </Card>
          
          <FormControl error={!!errors.termsAccepted} required>
            <FormControlLabel
              control={
                <Checkbox
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                />
              }
              label="I confirm that all information provided is accurate and I meet the eligibility criteria for blood donation."
            />
          </FormControl>
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button
          onClick={handleBack}
          startIcon={<ArrowBack />}
        >
          {activeStep === 0 ? 'Back to Overview' : 'Back'}
        </Button>
        
        <Button
          variant="contained"
          onClick={handleNext}
          endIcon={activeStep === steps.length - 1 ? <CheckCircle /> : <ArrowForward />}
        >
          {activeStep === steps.length - 1 ? 'Submit Registration' : 'Next'}
        </Button>
      </Box>
    </Paper>
  );
};

export default DonateBloodForm;