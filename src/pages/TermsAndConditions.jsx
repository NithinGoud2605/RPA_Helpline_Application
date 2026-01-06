import { Container } from '../components/layout/Container';
import { ArrowLeft, Shield, Users, FileText, AlertTriangle, Scale, Clock, Ban, CreditCard, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsAndConditions = () => {
    const sections = [
        {
            id: 1,
            title: "Acceptance of Terms",
            icon: FileText,
            content: [
                "By accessing or using RPA Helpline, you agree to be bound by these Terms and Conditions.",
                "If you do not agree to these terms, please do not use our platform.",
                "We reserve the right to modify these terms at any time. Continued use after changes constitutes acceptance."
            ]
        },
        {
            id: 2,
            title: "Platform Description",
            icon: Globe,
            content: [
                "RPA Helpline is an online marketplace connecting RPA developers, freelancers, trainers, job seekers, and hiring companies.",
                "We provide a platform for posting projects, jobs, training programs, and facilitating professional connections.",
                "RPA Helpline acts as an intermediary and does not employ any freelancers or developers listed on the platform."
            ]
        },
        {
            id: 3,
            title: "User Accounts & Registration",
            icon: Users,
            content: [
                "Users must provide accurate, complete, and current information during registration.",
                "You are responsible for maintaining the confidentiality of your account credentials.",
                "You must be at least 18 years old to create an account and use our services.",
                "Each user may only maintain one account. Multiple accounts may result in suspension.",
                "We reserve the right to suspend or terminate accounts that violate our terms."
            ]
        },
        {
            id: 4,
            title: "User Roles & Responsibilities",
            icon: Shield,
            content: [
                "Clients/Employers: Must provide clear project/job descriptions, pay agreed amounts promptly, and treat service providers professionally.",
                "Freelancers/Developers: Must deliver work as agreed, maintain professional communication, and accurately represent skills and experience.",
                "Trainers: Must provide quality educational content, accurate course descriptions, and honor refund policies where applicable.",
                "Job Seekers: Must provide accurate resume information and professional references.",
                "All users must not engage in fraudulent, deceptive, or harmful activities."
            ]
        },
        {
            id: 5,
            title: "Payments & Fees",
            icon: CreditCard,
            content: [
                "RPA Helpline may charge service fees for platform usage, which will be clearly disclosed.",
                "Payment terms between clients and service providers are subject to their mutual agreement.",
                "All financial transactions should be conducted through approved platform channels when applicable.",
                "Refund policies vary by service type and are subject to individual agreements.",
                "Users are responsible for any applicable taxes on earnings or payments."
            ]
        },
        {
            id: 6,
            title: "Intellectual Property",
            icon: Scale,
            content: [
                "Work product ownership is determined by the agreement between client and service provider.",
                "By default, completed and paid work becomes the property of the client unless otherwise agreed.",
                "Users retain ownership of their pre-existing intellectual property and portfolio materials.",
                "RPA Helpline retains rights to platform content, branding, and proprietary technology.",
                "Users grant RPA Helpline a license to display their profiles, portfolio items, and reviews on the platform."
            ]
        },
        {
            id: 7,
            title: "Confidentiality & Privacy",
            icon: Shield,
            content: [
                "Users must respect the confidentiality of project details, business information, and personal data shared on the platform.",
                "Personal information is handled according to our Privacy Policy.",
                "Users should not share sensitive credentials, proprietary code, or confidential business information outside secure channels.",
                "We implement security measures but cannot guarantee complete protection against all threats."
            ]
        },
        {
            id: 8,
            title: "Prohibited Activities",
            icon: Ban,
            content: [
                "Creating fake profiles, reviews, or misleading information.",
                "Harassment, discrimination, or abusive behavior towards other users.",
                "Attempting to circumvent platform fees by taking transactions off-platform.",
                "Posting illegal content, malware, or infringing materials.",
                "Scraping, automated data collection, or unauthorized access to platform systems.",
                "Spam, unsolicited advertising, or pyramid schemes.",
                "Any activity that violates applicable laws or regulations."
            ]
        },
        {
            id: 9,
            title: "Dispute Resolution",
            icon: Scale,
            content: [
                "Users are encouraged to resolve disputes directly through communication.",
                "RPA Helpline may offer mediation services for certain disputes at our discretion.",
                "We are not liable for disputes between users regarding work quality, payments, or agreements.",
                "For unresolved disputes, users may seek resolution through appropriate legal channels."
            ]
        },
        {
            id: 10,
            title: "Limitation of Liability",
            icon: AlertTriangle,
            content: [
                "RPA Helpline is provided 'as is' without warranties of any kind.",
                "We do not guarantee the quality, safety, or legality of services offered by users.",
                "We are not responsible for user actions, work quality, or failed transactions.",
                "Our liability is limited to the fees paid to us, where applicable.",
                "We are not liable for indirect, incidental, or consequential damages."
            ]
        },
        {
            id: 11,
            title: "Termination",
            icon: Clock,
            content: [
                "Users may deactivate their accounts at any time through account settings.",
                "We reserve the right to suspend or terminate accounts for violations of these terms.",
                "Upon termination, users must complete ongoing obligations and pending transactions.",
                "Certain provisions survive termination, including intellectual property rights and limitation of liability."
            ]
        },
        {
            id: 12,
            title: "Governing Law",
            icon: Globe,
            content: [
                "These Terms are governed by the laws of India.",
                "Any disputes shall be subject to the exclusive jurisdiction of courts in Bangalore, Karnataka, India.",
                "If any provision is found unenforceable, the remaining provisions remain in effect."
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-background py-20">
            <Container>
                <div className="max-w-4xl mx-auto">
                    {/* Back Button */}
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="font-mono text-sm">Back to Home</span>
                    </Link>

                    {/* Header */}
                    <div className="tech-panel rounded-xl p-6 md:p-8 mb-8 border border-border">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Scale className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground tracking-wider">
                                    TERMS OF SERVICE
                                </h1>
                                <p className="text-muted-foreground font-mono text-sm">
                                    RPA Helpline Platform Agreement
                                </p>
                            </div>
                        </div>
                        <p className="text-muted-foreground text-sm">
                            Last Updated: January 2025
                        </p>
                    </div>

                    {/* Introduction */}
                    <div className="tech-panel rounded-xl p-6 md:p-8 mb-6 border border-border">
                        <p className="text-muted-foreground leading-relaxed">
                            Welcome to <span className="text-primary font-semibold">RPA Helpline</span> – your trusted marketplace
                            for connecting with elite RPA developers, freelancers, trainers, and employers. These Terms of Service
                            govern your use of our platform and services. Please read them carefully before using RPA Helpline.
                        </p>
                    </div>

                    {/* Sections */}
                    <div className="space-y-4">
                        {sections.map((section) => (
                            <div
                                key={section.id}
                                className="tech-panel rounded-xl p-5 md:p-6 border border-border hover:border-primary/30 transition-colors"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <section.icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h2 className="text-lg font-display font-bold text-foreground mb-3">
                                            {section.id}. {section.title}
                                        </h2>
                                        <ul className="space-y-2">
                                            {section.content.map((item, idx) => (
                                                <li key={idx} className="flex gap-2 text-sm text-muted-foreground">
                                                    <span className="text-secondary mt-1">•</span>
                                                    <span className="leading-relaxed">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact Section */}
                    <div className="tech-panel rounded-xl p-6 md:p-8 mt-8 border border-primary/30 bg-primary/5">
                        <h3 className="text-lg font-display font-bold text-foreground mb-4">Questions About These Terms?</h3>
                        <p className="text-muted-foreground text-sm mb-4">
                            If you have any questions about these Terms of Service, please contact us:
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm">
                            <a
                                href="mailto:contact@rpahelpline.com"
                                className="text-secondary hover:text-secondary/80 transition-colors"
                            >
                                contact@rpahelpline.com
                            </a>
                            <span className="text-border">|</span>
                            <a
                                href="tel:+919490030441"
                                className="text-secondary hover:text-secondary/80 transition-colors"
                            >
                                +91 9490030441
                            </a>
                        </div>
                    </div>

                    {/* Footer Note */}
                    <div className="text-center mt-8 pb-8">
                        <p className="text-xs text-muted-foreground font-mono">
                            © 2025 RPA Helpline - All rights reserved
                        </p>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default TermsAndConditions;
