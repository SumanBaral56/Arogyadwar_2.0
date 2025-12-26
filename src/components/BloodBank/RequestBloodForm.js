import React, { useState } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Alert,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Emergency,
  LocalHospital,
  Person,
  Phone,
  CheckCircle,
} from '@mui/icons-material';

const RequestBloodForm = ({ onBack }) => {
  const [formData, setFormData] = useState({
    requesterType: 'patient',
    hospitalName: '',
    patientName: '',
    contactPerson: '',
    email: '',
    phone: '',
    
    patientAge: '',
    patientGender: '',
    patientBloodGroup: '',
    diagnosis: '',
    
    requiredBloodGroup: '',
    bloodType: 'Whole Blood',
    quantity: 1,
    requiredDate: '',
    urgency: 'normal',
    
    specialRequirements: '',
  });

  const [errors, setErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const bloodTypes = ['Whole Blood', 'Packed RBC', 'Platelets', 'Plasma'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.patientName) newErrors.patientName = 'Required';
    if (!formData.contactPerson) newErrors.contactPerson = 'Required';
    if (!formData.phone) newErrors.phone = 'Required';
    if (!formData.requiredBloodGroup) newErrors.requiredBloodGroup = 'Required';
    if (!formData.quantity || formData.quantity < 1) newErrors.quantity = 'Minimum 1 unit';
    if (!formData.requiredDate) newErrors.requiredDate = 'Required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setShowConfirmation(true);
    }
  };

  const handleConfirm = () => {
    console.log('Blood request submitted:', formData);
    setShowConfirmation(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <CheckCircle sx={{ fontSize: 80, color: '#4caf50', mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Request Submitted!
        </Typography>
        <Typography variant="body1" paragraph>
          Your blood request has been received. Our team will contact you shortly.
        </Typography>
        
        <Card variant="outlined" sx={{ mb: 3, textAlign: 'left' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Request Details</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}><strong>Request ID:</strong> BLD-{Date.now().toString().slice(-6)}</Grid>
              <Grid item xs={6}><strong>Status:</strong> <Chip label="Processing" color="warning" size="small" /></Grid>
              <Grid item xs={6}><strong>Blood Group:</strong> {formData.requiredBloodGroup}</Grid>
              <Grid item xs={6}><strong>Quantity:</strong> {formData.quantity} units</Grid>
              <Grid item xs={12}><strong>Contact:</strong> {formData.contactPerson} - {formData.phone}</Grid>
            </Grid>
          </CardContent>
        </Card>
        
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            Our team will contact you within 30 minutes. For urgent requests, call: <strong>1800-123-4567</strong>
          </Typography>
        </Alert>
        
        <Button variant="contained" onClick={onBack}>
          Back to Blood Bank
        </Button>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">
          Request Blood
        </Typography>
        <Button onClick={onBack} variant="outlined">
          Back to Overview
        </Button>
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Requester Type */}
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel>Requester Type</FormLabel>
              <RadioGroup row name="requesterType" value={formData.requesterType} onChange={handleChange}>
                <FormControlLabel value="patient" control={<Radio />} label="Patient/Family" />
                <FormControlLabel value="hospital" control={<Radio />} label="Hospital/Clinic" />
              </RadioGroup>
            </FormControl>
          </Grid>

          {formData.requesterType === 'hospital' && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Hospital/Clinic Name"
                name="hospitalName"
                value={formData.hospitalName}
                onChange={handleChange}
              />
            </Grid>
          )}

          {/* Contact Information */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Contact Person Name"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              error={!!errors.contactPerson}
              helperText={errors.contactPerson}
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
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>

          {/* Patient Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Patient Information
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Patient Name"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              error={!!errors.patientName}
              helperText={errors.patientName}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Patient Blood Group"
              name="patientBloodGroup"
              value={formData.patientBloodGroup}
              onChange={handleChange}
            >
              <MenuItem value="">Select</MenuItem>
              {bloodGroups.map(group => (
                <MenuItem key={group} value={group}>{group}</MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Blood Requirements */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Blood Requirements
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Required Blood Group"
              name="requiredBloodGroup"
              value={formData.requiredBloodGroup}
              onChange={handleChange}
              error={!!errors.requiredBloodGroup}
              helperText={errors.requiredBloodGroup}
              required
            >
              <MenuItem value="">Select</MenuItem>
              {bloodGroups.map(group => (
                <MenuItem key={group} value={group}>{group}</MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Blood Type"
              name="bloodType"
              value={formData.bloodType}
              onChange={handleChange}
            >
              {bloodTypes.map(type => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Quantity (Units)"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              error={!!errors.quantity}
              helperText={errors.quantity || "1 unit = 450 ml"}
              required
              inputProps={{ min: 1 }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Required Date"
              name="requiredDate"
              type="date"
              value={formData.requiredDate}
              onChange={handleChange}
              error={!!errors.requiredDate}
              helperText={errors.requiredDate}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Diagnosis/Condition"
              name="diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
              multiline
              rows={2}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Special Requirements"
              name="specialRequirements"
              value={formData.specialRequirements}
              onChange={handleChange}
              multiline
              rows={2}
              placeholder="e.g., CMV negative, irradiated, etc."
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
              <Button
                type="button"
                variant="outlined"
                onClick={onBack}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="error"
                size="large"
                startIcon={<Emergency />}
              >
                Submit Request
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>

      {/* Emergency Contact Card */}
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Emergency sx={{ mr: 1, color: '#f44336' }} />
            <Typography variant="h6">Emergency Contact</Typography>
          </Box>
          <Typography variant="h5" color="#f44336" gutterBottom>
            24/7 Helpline: 1800-123-4567
          </Typography>
          <Typography variant="body2" color="text.secondary">
            For immediate assistance, call our emergency hotline.
          </Typography>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onClose={() => setShowConfirmation(false)}>
        <DialogTitle>Confirm Blood Request</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Are you sure you want to submit this blood request?
          </Typography>
          <Alert severity="info" sx={{ mt: 2 }}>
            Our team will contact you at <strong>{formData.phone}</strong> to confirm details.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmation(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleConfirm}
            startIcon={<CheckCircle />}
          >
            Confirm Request
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default RequestBloodForm;