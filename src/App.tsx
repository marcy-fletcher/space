import {Route, Routes} from "react-router-dom";
import {HashRouter as Router} from "react-router-dom";
import {Suspense, lazy} from "react";
import {ProtectedRoute} from "./auth/components/ProtectedRoute.tsx";
import {policy, auth, noAuth, role} from "./auth/policies/policyBuilders.ts";
import {AGE_VERIFIED_KEY, queryClient} from "./main.tsx";
import {ThemeProvider} from "./common/context/ThemeProvider.tsx";
import {AuthProvider} from "./auth/providers/AuthProvider.tsx";
import {QueryClientProvider} from "@tanstack/react-query";
import GeoCheck from "./common/components/GeoCheck.tsx";
import TrackVisit from "./pages/TrackVisit.tsx";

const MainLayout = lazy(() => import("./layout/MainLayout.tsx"));
const Login = lazy(() => import("./pages/Login.tsx"));
const FocusLayout = lazy(() => import("./layout/FocusLayout.tsx"));
const Register = lazy(() => import("./pages/Register.tsx"));
const Posts = lazy(() => import("./blog/pages/Posts.tsx"));
const Post = lazy(() => import("./blog/pages/Post.tsx"));
const About = lazy(() => import("./blog/pages/About.tsx"));
const Subscriptions = lazy(() => import("./blog/pages/Subscriptions.tsx"));
const IdeaSubmit = lazy(() => import("./blog/pages/IdeaSubmit.tsx"));
const CreatePost = lazy(() => import("./blog/pages/posts/CreatePost.tsx"));
const EditPost = lazy(() => import("./blog/pages/posts/EditPost.tsx"));
const ToastContainer = lazy(() => import("./common/components/ToastContainer.tsx"));
const Unauthorized = lazy(() => import("./pages/Unauthorized.tsx"));
const EmailConfirmation = lazy(() => import("./pages/EmailConfirmation.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const Loader = lazy(() => import("./common/components/Loader.tsx"));
const Invites = lazy(() => import("./invites/pages/Invites.tsx"));
const AgeConfirmation = lazy(() => import("./pages/AgeConfirmation.tsx"));

function Routing() {

    if (!localStorage.getItem(AGE_VERIFIED_KEY))
        return <AgeConfirmation/>

    return <Router>
        <Suspense fallback={<Loader className="w-full h-full"/>}>
            <Routes>
                <Route element={
                    <Suspense>
                        <MainLayout/>
                    </Suspense>
                }>
                    <Route path="/" element={
                        <Suspense>
                            <Posts/>
                        </Suspense>
                    }/>
                    <Route
                        path="/idea"
                        element={
                            <Suspense>
                                <ProtectedRoute policy={policy(auth())}>
                                    <IdeaSubmit/>
                                </ProtectedRoute>
                            </Suspense>
                        }
                    />
                    <Route path="/subscriptions" element={<Subscriptions/>}/>
                    <Route path="/invites" element={
                        <Suspense>
                            <ProtectedRoute policy={policy(auth())}>
                                <Invites/>
                            </ProtectedRoute>
                        </Suspense>
                    }/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/posts/create"
                           element={
                               <Suspense>
                                   <ProtectedRoute policy={policy(auth(), role('admin'))}>
                                       <CreatePost/>
                                   </ProtectedRoute>
                               </Suspense>
                           }
                    />
                    <Route path="/posts/edit/:id"
                           element={
                               <Suspense>
                                   <ProtectedRoute policy={policy(auth(), role('admin'))}>
                                       <EditPost/>
                                   </ProtectedRoute>
                               </Suspense>
                           }
                    />
                    <Route path="/posts/:id" element={<Post/>}/>
                </Route>

                <Route element={<FocusLayout/>}>
                    <Route
                        path="/login"
                        element={
                            <ProtectedRoute forbiddenTo="/" policy={policy(noAuth())}>
                                <Login/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <ProtectedRoute forbiddenTo="/" policy={policy(noAuth())}>
                                <Register/>
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/403" element={<Unauthorized/>}/>
                    <Route path="/email-confirmation" element={<EmailConfirmation/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Route>

                <Route path="/track/" element={
                    <Suspense>
                        <TrackVisit/>
                    </Suspense>
                }/>
            </Routes>
        </Suspense>

        <Suspense fallback={null}>
            <ToastContainer/>
        </Suspense>
    </Router>
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <GeoCheck>
                <AuthProvider>
                    <ThemeProvider>
                        <Routing/>
                    </ThemeProvider>
                </AuthProvider>
            </GeoCheck>
        </QueryClientProvider>
    );
}

export default App;