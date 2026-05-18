const express = require('express');
const bodyParser = require('body-parser');
const supabaseClient = require('@supabase/supabase-js');
// const { isValidStateAbbreviation } = require('usa-state-validator');
const dotenv = require('dotenv');

const app = express();
const port = 3000;
dotenv.config();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.get('/', (req, res) => {
     res.sendFile('public/index.html', { root: __dirname })
})

app.get('/about', (req, res) => {
     res.sendFile('public/about.html', { root: __dirname })
})

app.get('/resume', (req, res) => {
     res.sendFile('public/resume.html', { root: __dirname })
})

// Get all resume matches that were saved
app.get('/api/resumes', async (req, res) => {
     const { data, error } = await supabase.from('resumes').select("*").order('created_at', { ascending: false });

     res.json(data)
});

// post a new resume match result
app.post('/api/resumes', async (req, res) => {
     try{
          console.log(req.body);
           const { filename, score } = req.body;

     const { data, error } = await supabase
          .from('resumes').insert([{ filename, score }
          ])
          .select();

     if (error) {
               console.error(error);
               return res.status(500).json({
                    error: error.message
               });
          }

     res.json(data);
     
     }
     catch (err) {
          console.error(err);

          res.status(500).json({
               error: err.message
          });
     }
    
});

// external API endpoint requirement
app.get('/api/jobs', async (req, res) => {
     try {
          const query = req.query.q;

          const response = await fetch(
               `https://himalayas.app/jobs/api/search?q=${query}&limit=20`
          );

          const data = await response.json();

          res.json(data.jobs);
     }
     catch (error) {
          console.log("error getting data")
     }
});



app.listen(port, () => {
     console.log(`App is available on port: ${port}`);
})

