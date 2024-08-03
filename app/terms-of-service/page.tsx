import { Box } from "@mui/material";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Stable UI - Terms of Service'
}

const TermsOfService = async () => {
    return (
        <Box >
            <h1>Terms of Service</h1>
            <p><em>Last Updated: August 3rd, 2024</em></p>

            <h2>Introduction</h2>
            <p>{'Welcome to Stable UI ("we," "our," "us"). These Terms of Service ("Terms") govern your use of our website and services at'} <Link href="https://stableui.io" style={{ color: 'inherit' }}>https://stableui.io</Link> {'(the "Service"). By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, do not use the Service.'}</p>

            <h2>Eligibility</h2>
            <p>You must be at least 18 years old to use the Service. By using the Service, you represent and warrant that you meet this requirement.</p>

            <h2>Account Registration</h2>
            <p>To access certain features of the Service, you may be required to create an account. You agree to provide accurate and complete information during the registration process and to keep your account information up-to-date. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>

            <h2>User Conduct</h2>
            <p>You agree to use the Service in compliance with all applicable laws and regulations. You agree not to:</p>
            <ul>
                <li>Use the Service for any unlawful purpose or in any way that could harm or impair the Service</li>
                <li>Impersonate any person or entity or falsely state or otherwise misrepresent your affiliation with a person or entity</li>
                <li>Interfere with or disrupt the Service or servers or networks connected to the Service</li>
            </ul>

            <h2>Third-Party Services</h2>
            <p>Our Service may integrate with third-party services, including Stability AI. By using these integrated services, you agree to adhere to Stability AI&apos;s Terms of Service, which can be found at <Link href="https://platform.stability.ai/legal/terms-of-service" style={{ color: 'inherit' }}>https://platform.stability.ai/legal/terms-of-service</Link>. We are not responsible for the content, policies, or practices of third-party services.</p>

            <h2>Intellectual Property</h2>
            <p>The Service and its original content, features, and functionality are and will remain the exclusive property of Stable UI and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.</p>

            <h2>Termination</h2>
            <p>We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the Service will cease immediately.</p>

            <h2>Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, Stable UI shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (i) your use or inability to use the Service; (ii) any unauthorized access to or use of our servers and/or any personal information stored therein; and (iii) any third-party conduct or content on the Service.</p>

            <h2>Disclaimer of Warranties</h2>
            <p>{'The Service is provided on an "AS IS" and "AS AVAILABLE" basis. Stable UI makes no representations or warranties of any kind, express or implied, regarding the operation or availability of the Service or the information, content, materials, or products included therein.'}</p>

            <h2>Governing Law</h2>
            <p>These Terms shall be governed and construed in accordance with the laws of [Your State/Country], without regard to its conflict of law provisions.</p>

            <h2>Changes to These Terms</h2>
            <p>{'We reserve the right to modify these Terms at any time. When we do, we will post the updated Terms on this page and update the "Effective Date" at the top of this page. Your continued use of the Service after any such changes constitutes your acceptance of the new Terms.'}</p>

            <h2>Contact Us</h2>
            <p>If you have any questions or concerns about these Terms, please contact us at:</p>
            <p><Link href="mailto:support@stableui.io" style={{ color: 'inherit' }}>support@stableui.io</Link></p>

            <p>Thank you for using Stable UI.</p>
        </Box>
    )
}

export default TermsOfService;