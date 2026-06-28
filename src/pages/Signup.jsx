export default function Signup() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow border-0 p-4">
            <h2 className="text-center mb-4">Create Account</h2>

            <input type="text" className="form-control mb-3" placeholder="Full name" />
            <input type="email" className="form-control mb-3" placeholder="Email address" />
            <input type="password" className="form-control mb-3" placeholder="Password" />

            <button className="btn btn-primary w-100">Signup</button>

            <p className="text-center mt-3">
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}