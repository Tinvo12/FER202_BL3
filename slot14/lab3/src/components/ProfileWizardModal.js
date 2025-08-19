import React, { useState, useEffect, useReducer, useMemo, useCallback } from 'react';
import { Modal, Nav, Tab, Button, ProgressBar } from 'react-bootstrap';
import PropTypes from 'prop-types';
import AboutTab from './profile/AboutTab';
import AccountTab from './profile/AccountTab';
import AddressTab from './profile/AddressTab';
import ProfileSuccessModal from './ProfileSuccessModal';


const initialState = {
  
  firstName: '',
  lastName: '',
  email: '',
  avatar: null,
  
  
  username: '',
  password: '',
  confirmPassword: '',
  secretQuestion: '',
  answer: '',
  
  
  street: '',
  city: '',
  state: '',
  zipCode: '',
  country: ''
};


const formReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      
      return {
        ...state,
        [action.field]: action.value
      };
    case 'UPDATE_AVATAR':
      
      return {
        ...state,
        avatar: action.value
      };
    case 'RESET_FORM':
      
      return initialState;
    default:
      return state;
  }
};

const ProfileWizardModal = ({ show, onHide, onStudentAdded }) => {
  
  const [activeTab, setActiveTab] = useState('about');
  
  
  const [formData, dispatch] = useReducer(formReducer, initialState);
  
  
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [submittedData, setSubmittedData] = useState(null);


  
  
  
  const validateAboutTab = useCallback(() => {
    return formData.firstName.trim() !== '' && 
           formData.lastName.trim() !== '' && 
           formData.email.trim() !== '' &&
           /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  }, [formData.firstName, formData.lastName, formData.email]);

 
  const validateAccountTab = useCallback(() => {
    return formData.username.length >= 6 &&
           formData.password.length >= 8 &&
           /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(formData.password) &&
           formData.password === formData.confirmPassword &&
           formData.secretQuestion !== '' &&
           formData.answer.trim() !== '';
  }, [formData.username, formData.password, formData.confirmPassword, formData.secretQuestion, formData.answer]);

  
  const validateAddressTab = useCallback(() => {
    return formData.street.trim() !== '' &&
           formData.city.trim() !== '' &&
           formData.state.trim() !== '' &&
           formData.zipCode.trim() !== '' &&
           formData.country !== '';
  }, [formData.street, formData.city, formData.state, formData.zipCode, formData.country]);

  
  const stepValidity = useMemo(() => ({
    about: validateAboutTab(),
    account: validateAccountTab(),
    address: validateAddressTab()
  }), [validateAboutTab, validateAccountTab, validateAddressTab]);

  
  const progressPercentage = useMemo(() => {
    const completedSteps = Object.values(stepValidity).filter(Boolean).length;
    return (completedSteps / 3) * 100;
  }, [stepValidity]);

 
  const nextStep = useCallback(() => {
    if (activeTab === 'about' && stepValidity.about) {
      setActiveTab('account');
    } else if (activeTab === 'account' && stepValidity.account) {
      setActiveTab('address');
    }
  }, [activeTab, stepValidity]);

 
  const prevStep = useCallback(() => {
    if (activeTab === 'account') {
      setActiveTab('about');
    } else if (activeTab === 'address') {
      setActiveTab('account');
    }
  }, [activeTab]);


  const handleFinish = useCallback(() => {
    if (stepValidity.address) {
      console.log('Submitting form data:', formData); 
      
      
      setSubmittedData({...formData});
      setShowSuccessModal(true);
      
      onHide();
    }
  }, [stepValidity.address, onHide, formData, onStudentAdded]);

  
  const handleFieldChange = useCallback((field, value) => {
    dispatch({ type: 'UPDATE_FIELD', field, value });
  }, []);

  
  const handleFileChange = useCallback((file) => {
    dispatch({ type: 'UPDATE_AVATAR', value: file });
  }, []);

 
  const handleClose = useCallback(() => {
    dispatch({ type: 'RESET_FORM' });
    setActiveTab('about');
    onHide();
  }, [onHide]);


  useEffect(() => {
    if (!show) {
      dispatch({ type: 'RESET_FORM' });
      setActiveTab('about');
    }
  }, [show]);

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" centered className="profile-wizard-modal">
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold text-uppercase">Build Your Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProgressBar 
            now={progressPercentage} 
            className="mb-3" 
            variant="success"
            label={`${Math.round(progressPercentage)}% Complete`}
          />
          
          <Nav variant="tabs" className="mb-3">
            <Nav.Item>
              <Nav.Link 
                active={activeTab === 'about'}
                onClick={() => setActiveTab('about')}
                className={activeTab === 'about' ? 'bg-success text-white' : ''}
              >
                About
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>[]
              <Nav.Link 
                active={activeTab === 'account'}
                onClick={() => stepValidity.about && setActiveTab('account')}
                className={activeTab === 'account' ? 'bg-success text-white' : ''}
                disabled={!stepValidity.about}
              >
                Account
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                active={activeTab === 'address'}
                onClick={() => stepValidity.account && setActiveTab('address')}
                className={activeTab === 'address' ? 'bg-success text-white' : ''}
                disabled={!stepValidity.account}
              >
                Address
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane active={activeTab === 'about'}>
              <AboutTab 
                formData={formData}
                onFieldChange={handleFieldChange}
                onFileChange={handleFileChange}
                isValid={stepValidity.about}
              />
            </Tab.Pane>
            <Tab.Pane active={activeTab === 'account'}>
              <AccountTab 
                formData={formData}
                onFieldChange={handleFieldChange}
                isValid={stepValidity.account}
              />
            </Tab.Pane>
            <Tab.Pane active={activeTab === 'address'}>
              <AddressTab 
                formData={formData}
                onFieldChange={handleFieldChange}
                isValid={stepValidity.address}
              />
            </Tab.Pane>
          </Tab.Content>
        </Modal.Body>
        <Modal.Footer>
          {activeTab !== 'about' && (
            <Button variant="outline-secondary" onClick={prevStep}>
              Previous
            </Button>
          )}
          {activeTab !== 'address' ? (
            <Button 
              variant="success" 
              onClick={nextStep}
              disabled={!stepValidity[activeTab]}
            >
              Next
            </Button>
          ) : (
            <Button 
              variant="success" 
              onClick={handleFinish}
              disabled={!stepValidity.address}
            >
              Finish
            </Button>
          )}
        </Modal.Footer>
      </Modal>
      <ProfileSuccessModal 
  show={showSuccessModal}
  onHide={() => setShowSuccessModal(false)}
  profileData={submittedData || formData} 
/>
    </>
  );
};


ProfileWizardModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onStudentAdded: PropTypes.func
};

export default ProfileWizardModal;
