export default function Login() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow border-0 p-4">
            <h2 className="text-center mb-4">Login</h2>

            <input type="email" className="form-control mb-3" placeholder="Email address" />
            <input type="password" className="form-control mb-3" placeholder="Password" />

            <button className="btn btn-primary w-100">Login</button>

            <p className="text-center mt-3">
              Don&apos;t have an account? <a href="/signup">Signup</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}