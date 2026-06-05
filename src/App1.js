import react from 'react';
function App1() {
    function handleClick() {
        alert("Button clicked!");
    }
  return (
    <div className="container-fluid mt-4 ">
        <div className='row justify-content-center'>
            <div className='col-md-12'>
            <marquee><h1 className="text-dark item-center">Hello Bootstrap in React!</h1></marquee>
        <br></br>
        <button className="btn btn-primary item-center" onClick={handleClick}>Click Me</button>
        </div>
    </div>
    </div>
  );
}
export default App1;