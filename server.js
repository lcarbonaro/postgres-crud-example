const express = require('express');
const cors = require('cors');
const postgres = require('postgres');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()) // for parsing application/json




const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;

const sql = postgres(URL, { ssl: 'require' });

app.get('/', async (req,res) => {
    const result = {"hello":"world"};
    console.log(result);
    let data = {"result": result};
    res.json(data);  
});

app.get('/test', async (req,res) => {
    const result = await sql`select version()`;
    console.log(result);
    let data = {"result": result};
    res.json(data);  
});


// create a record
app.post("/jobs", async (req,res) => {	
	const result = await sql`
		insert 
		  into jobs 
		  (jobtitle,company,region,jobcategory)
		  values( 
			${req.body.jobTitle}, 
			${req.body.company}, 
			${req.body.region}, 
			${req.body.jobCategory} )`;
    console.log(result);
    let data = {"result": result};
    res.json(data);       
});


// get records 
app.get("/jobs", async (req, res) => {
    const result = await sql`select * from jobs`;
    console.log(result);
    let data = {"result": result};
    res.json(data);      
});


// get record by id 
app.get("/jobs/:id", async (req,res) => {
	const result = await sql`
	  select * 
	    from jobs 
		where id=${req.params.id}`;
    console.log(result);
    let data = {"result": result};
    res.json(data);      
});


// update a specific record
app.put("/jobs/:id", async (req,res) => {
	//console.log(req.body);
	const result = await sql`
		update jobs 
		  set jobtitle    = ${req.body.jobTitle},
		      company     = ${req.body.company},
			  region      = ${req.body.region},
			  jobcategory = ${req.body.jobCategory}
		  where id=${req.params.id}`;
    console.log(result);
    let data = {"result": result};
    res.json(data);      
});


// delete a specific record
app.delete("/jobs/:id", async (req,res) => {
	const result = await sql`delete from jobs where id=${req.params.id}`;
    console.log(result);
    let data = {"result": result};
    res.json(data);      
});










app.listen(PORT,()=>{
    console.log(`Server is up and listening on port ${PORT}`);
});





// earlier example
/*
app.get('/',(request,response)=>{
    let data = {"hello":"world"};
    response.json(data);
    //response.send('HELLO');
});

app.post('/searchbycategory',(request,response)=>{
    let searchCriteria = request.body.jobCategory;
    console.log(`search=${searchCriteria}`);
    let respData = data.filter(job => job.jobCategory.toUpperCase() === searchCriteria);
    console.log(respData);
    response.json(respData);
});
*/










// sample data from earlier example
/*
const data = [
	{
		"id": "DC1793C1-EC81-D427-78BA-1312BEEFC4CC",
		"jobTitle": "Platform engineer",
		"company": "Magnis Dis Ltd",
		"region": "Chattanooga",
		"jobCategory": "IT"
	},
	{
		"id": "0254383E-C856-5EE8-3B57-E2674EA0DEBF",
		"jobTitle": "(user experience) designer",
		"company": "Nulla Interdum Corporation",
		"region": "Battagram",
		"jobCategory": "IT"
	},
	{
		"id": "6A38F873-23DB-3ED4-63AE-C6C117D3C22A",
		"jobTitle": "assurance analyst",
		"company": "Mauris Blandit Mattis Company",
		"region": "San Venanzo",
		"jobCategory": "IT"
	},
	{
		"id": "5B513268-EE87-AA24-5817-0D66A4D3A331",
		"jobTitle": "Software engineer",
		"company": "Fusce Aliquam Institute",
		"region": "Hallein",
		"jobCategory": "IT"
	},
	{
		"id": "AE5CAECD-FFBE-6931-2459-3BD478BE5294",
		"jobTitle": "Software quality assurance",
		"company": "Blandit Mattis Company",
		"region": "Kalush",
		"jobCategory": "IT"
	},
	{
		"id": "DC1793C1-EC81-D427-78BA-1312BEEFC4CC",
		"jobTitle": "Certified",
		"company": "Magnis Dis Ltd",
		"region": "Chattanooga",
		"jobCategory": "Accounting"
	},
	{
		"id": "0254383E-C856-5EE8-3B57-E2674EA0DEBF",
		"jobTitle": "Financial",
		"company": "Nulla Interdum Corporation",
		"region": "Battagram",
		"jobCategory": "Accounting"
	},
	{
		"id": "6A38F873-23DB-3ED4-63AE-C6C117D3C22A",
		"jobTitle": "Controller",
		"company": "Mauris Blandit Mattis Company",
		"region": "San Venanzo",
		"jobCategory": "Accounting"
	},
	{
		"id": "5B513268-EE87-AA24-5817-0D66A4D3A331",
		"jobTitle": "Controller Accounting",
		"company": "Fusce Aliquam Institute",
		"region": "Hallein",
		"jobCategory": "Accounting"
	},
	{
		"id": "AE5CAECD-FFBE-6931-2459-3BD478BE5294",
		"jobTitle": "clerk",
		"company": "Blandit Mattis Company",
		"region": "Kalush",
		"jobCategory": "Accounting"
	}

]

CREATE TABLE jobs (
   id SERIAL PRIMARY KEY,
   jobTitle varchar not null,
   company varchar not null,
	 region varchar not null,
	 jobCategory varchar not null );
*/