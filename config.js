// ===================================
// Website Configuration
// ===================================
// Edit this file to customize your website content

const SITE_CONFIG = {
    // Personal Information
    author: {
        name: "Lavsen Dahal",
        title: "PhD Researcher in Computer Vision & Medical AI",
        institution: "Duke University",
        department: "Electrical & Computer Engineering",
        location: "Durham, NC, USA",
        email: "lavsen.dahal@duke.edu",
        profileImage: "assets/profile.jpg" // Add your photo to assets folder
    },

    // Social Media Links
    social: {
        googleScholar: "https://scholar.google.com/citations?user=52zp7VkAAAAJ&hl=en",
        linkedin: "https://linkedin.com/in/lavsen",
        github: "https://github.com/lavsendahal",
        X: "https://x.com/lavsendahal", // Optional
        orcid: "" // Optional
    },

    // About Me Section
    about: {
        intro: `I am a PhD student in Electrical & Computer Engineering at Duke University, working at the
        <strong>Center for Virtual Imaging Trials</strong>. My research focuses on developing advanced
        computer vision and AI methods for medical imaging applications.`,

        paragraph1: `My work spans <strong>vision-language models</strong> for disease localization, <strong>multi-modal
        segmentation</strong> algorithms, and the creation of <strong>anatomical digital twins</strong> for
        synthetic imaging experiments. I'm particularly interested in self-supervised and weakly-supervised
        learning approaches that reduce the annotation burden in medical AI.`,

        paragraph2: `Before joining Duke, I earned my Master's in Medical Imaging & Applications from the University of
        Girona (Spain) as an Erasmus+ Global Scholar, and my Bachelor's in Electrical & Electronics
        Engineering from VNIT Nagpur (India). I've had the privilege of conducting research at Imperial
        College London and have contributed to various international AI workshops.`
    },

    // Research Interests
    researchInterests: [
        {
            icon: "fa-eye",
            title: "Computer Vision",
            description: "Medical image segmentation, object detection, and multi-modal fusion"
        },
        {
            icon: "fa-language",
            title: "Vision-Language Models",
            description: "Self-supervised and weakly-supervised disease localization"
        },
        {
            icon: "fa-cube",
            title: "3D Medical Imaging",
            description: "Digital twin generation and anatomical modeling"
        },
        {
            icon: "fa-robot",
            title: "Deep Learning",
            description: "PyTorch, diffusion models, uncertainty estimation"
        }
    ],

    // Projects
    projects: [
        {
            title: "XCAT 3.0: Digital Twin Library",
            description: "End-to-end pipeline generating 2,500+ anatomical 3D digital twin models for large-scale synthetic imaging experiments",
            image: "assets/xcat3.jpg", // Add project images to assets folder
            tags: ["3D Modeling", "Medical Imaging", "PyTorch"],
            status: "active", // "active" or "completed"
            link: "https://xcat-3.github.io"
        },
        {
            title: "Vision-Language Model for Disease Localization",
            description: "Multi-modal integration for robust disease detection with minimal manual annotation using self-supervised learning",
            image: "assets/vlm.jpg",
            tags: ["VLM", "Self-Supervised", "Medical AI"],
            status: "active",
            link: ""
        },
        {
            title: "Multi-Modal Anatomical Segmentation",
            description: "40% increase in anatomical structures segmented from full-body scans via multi-modal fusion",
            image: "assets/segmentation.jpg",
            tags: ["Segmentation", "Multi-Modal", "MONAI"],
            status: "active",
            link: ""
        },
        {
            title: "Bayesian Uncertainty Estimation",
            description: "Monte Carlo Dropout framework for uncertainty quantification in medical image segmentation",
            image: "assets/uncertainty.jpg",
            tags: ["Bayesian DL", "Uncertainty", "Segmentation"],
            status: "completed",
            link: ""
        }
    ],

    // Invited Talks & Conferences
    talks: [
        {
            year: "2025",
            title: "CVPR 2025",
            venue: "Computer Vision and Pattern Recognition Conference",
            description: "Presented \"Five Models for Five Modalities: Open-Vocabulary Segmentation in Medical Imaging\""
        },
        {
            year: "2023",
            title: "SPIE Medical Imaging 2023",
            venue: "Medical Imaging Conference",
            description: "Presented automatic quality control methods for CT volume segmentation"
        },
        {
            year: "2020",
            title: "International AI Workshop - Nepal",
            venue: "Nepal Applied Mathematics and Informatics Institute",
            description: "Co-organized workshop with 100+ participants; delivered sessions on generative models and advanced ML applications"
        },
        {
            year: "2020",
            title: "MICCAI Workshop",
            venue: "Medical Image Computing and Computer Assisted Intervention",
            description: "Presented RCNN-based vertebrae detection system for automated scoliosis measurement"
        }
    ],

    // CV Settings
    cv: {
        filename: "Resume_Medical_Imaging_Lavsen_Dahal.pdf"
    },

    // Google Scholar Settings
    googleScholar: {
        enabled: true,
        authorName: "Lavsen Dahal", // Your name as it appears on Google Scholar
        fallbackPublications: true // Show fallback publications if auto-fetch fails
    }
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SITE_CONFIG;
}
