import { useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter from Next.js

const FormPage = () => {
  const [step, setStep] = useState(1);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    // Add more fields as necessary
  });
  const router = useRouter(); // Initialize useRouter hook

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const response = await fetch('/api/form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the appropriate content type
      },
      body: JSON.stringify(formData), // Convert form data to JSON
    });

    if (response.ok) {
      setSubmissionStatus('Submission successful!');
      router.push('/'); // Navigate to home page after successful submission
    } else {
      setSubmissionStatus('Submission failed. Please try again.');
      console.error('Form submission failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </label>
      </div>
      {/* Add more fields as necessary */}

      <button type="submit">Submit</button>
      {submissionStatus && <p>{submissionStatus}</p>} {/* Display submission status */}
    </form>
  );
};

export default FormPage;
