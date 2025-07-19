import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import ManuscriptForm from "./manuscript/ManuscriptForm";
import Ethics from "./components/Ethics";
import AuthorGuidelines from "./components/AuthorGuidelines";
import Privacy from "./components/Privacy";
import RequireAuth from "./components/RequireAuth";
import Login from "./users/Login";
import Signup from "./users/Signup";
import Profile from "./users/Profile";
import Header from "./components/Header";
import Dashboard from "./users/Dashboard";
import ManuscriptDetails from "./users/ManuscriptDetails";
import ReviewManuscripts from "./users/ReviewManuscripts";
import Unauthorized from "./components/Unauthorized";
import Missing from "./components/Missing";
import { Toaster } from "react-hot-toast";
import Contact from "./components/Contact";
import CurrentIssue from "./manuscript/CurrentIssue";
import Archive from "./manuscript/Archive";
import Reviews from "./manuscript/Reviews";
import AuditReviews from "./users/AuditReviews";
import Issuing from "./users/Issuing";
import UsersList from "./users/UsersList";
import InviteUser from "./users/InviteUsers";
import CompleteInvite from "./users/CompleteInvite";
import SendReset from "./users/SendReset";
import VerifyReset from "./users/VerifyReset";
import ManuscriptView from "./manuscript/ManuscriptView";
import PaymentPage from "./manuscript/PaymentPage";
import AdminMessages from "./users/AdminMessages";
import SubmitArchive from "./users/SubmitArchive";
import ManuscriptList from "./manuscript/ManuscriptList";
import EditorialBoard from "./components/EditorialBoard";
import Footer from "./components/Footer";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<RequireAuth allowedRoles={["author"]} />}>
            <Route path="/submit" element={<ManuscriptForm />} />
            <Route path="/edit/:id" element={<ManuscriptForm />} />
          </Route>
          <Route
            element={
              <RequireAuth allowedRoles={["author", "editor", "admin"]} />
            }
          >
            <Route path="reset-password/:token" element={<VerifyReset />} />
            <Route path="/view/:manuscriptId" element={<ManuscriptDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["editor", "admin"]} />}>
            <Route path="/messages" element={<AdminMessages />} />
            <Route path="/audit-reviews" element={<AuditReviews />} />
            <Route path="/manuscripts" element={<ReviewManuscripts />} />
            <Route path="/issuing" element={<Issuing />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="send-archive" element={<SubmitArchive />} />
            <Route path="/issuing" element={<Issuing />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/invite" element={<InviteUser />} />
          </Route>
          <Route path="/editorial-board" element={<EditorialBoard />} />
          <Route path="/recent-uploads" element={<ManuscriptList />} />
          <Route path="send-reset" element={<SendReset />} />
          <Route path="/pay/:id" element={<PaymentPage />} />
          <Route path="/invite/:token" element={<CompleteInvite />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/ethics" element={<Ethics />} />
          <Route path="/manuscript/:id" element={<ManuscriptView />} />
          <Route path="/author-guidelines" element={<AuthorGuidelines />} />
          <Route path="/issue" element={<CurrentIssue />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/*" element={<Missing />} />
        </Routes>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 5000,
          }}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
