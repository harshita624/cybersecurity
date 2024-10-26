export default async function handler(req, res) {
    if (req.method === "POST") {
      const { name, email } = req.body;
  
      // Here you can handle the form data, like saving to a database, etc.
      console.log("Form data:", { name, email });
  
      // Return a success response
      res.status(200).json({ message: "Form submitted successfully" });
    } else {
      // Handle other HTTP methods
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} not allowed`);
    }
  }
  