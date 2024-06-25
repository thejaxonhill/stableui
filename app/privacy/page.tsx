import { Box } from "@mui/material"

const PrivacyPolicy = () => {
    return (
        <Box >
            <h1>Privacy Policy</h1>
            <p><strong>Last Updated: June 24th, 2024</strong></p>

            <h2>Introduction</h2>
            <p>{'Welcome to Stable UI ("we," "our," "us"). We are committed to protecting your privacy. This Privacy Policy explains how we handle your personal information when you visit our website and use our services at'} <a href="https://stableui.io">https://stableui.io</a>.</p>

            <h2>Information We Collect</h2>

            <h3>OAuth Authentication</h3>
            <p>We use OAuth for user identification. When you log in using OAuth, we may collect and store your basic profile information provided by the OAuth provider (such as your name, email address, and profile picture). This information is used solely for authentication and to provide you access to our services.</p>

            <h2>How We Use Your Information</h2>
            <p>We use the information collected via OAuth authentication to:</p>
            <ul>
                <li>Authenticate and verify your identity</li>
                <li>Provide you with access to our website and services</li>
                <li>Improve user experience by personalizing your interaction with our website</li>
            </ul>

            <h2>Data Tracking and Cookies</h2>
            <p>We do not track any user data beyond what is necessary for OAuth authentication. We do not use cookies or any other tracking technologies to monitor your activities on our website.</p>

            <h2>Sharing Your Information</h2>
            <p>We do not share, sell, rent, or trade your personal information with third parties for their promotional purposes.</p>

            <h2>Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, loss, or misuse. However, please note that no method of transmission over the internet or method of electronic storage is 100% secure.</p>

            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
                <li>Access and review your personal information</li>
                <li>Request corrections to any inaccurate or incomplete information</li>
                <li>Request the deletion of your personal information</li>
            </ul>
            <p>To exercise any of these rights, please contact us at support@stableui.io.</p>

            <h2>Changes to This Privacy Policy</h2>
            <p>{'We may update this Privacy Policy from time to time. When we do, we will post the updated policy on this page and update the "Effective Date" at the top of this page. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.'}</p>

            <h2>Contact Us</h2>
            <p>If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us at:</p>
            <p>
                Stable UI<br />
                support@stableui.io<br /></p>
            <p>Thank you for visiting Stable UI.</p>
        </Box>
    )
}

export default PrivacyPolicy;