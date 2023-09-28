import  { useEffect } from 'react';

const SEO = ({ pageTitle, font }) => {
    useEffect(() => {
        document.title = pageTitle ? `${pageTitle} || Ujuzi StemEx application` : 'Ujuzi Online Practical Education Platform';
        document.querySelector('meta[name="description"]').setAttribute("content", "what the hands create the brain keeps");
        document.querySelector('meta[name="robots"]').setAttribute("content", "noindex, follow");
        document.querySelector('meta[name="viewport"]').setAttribute("content", "width=device-width, initial-scale=1, shrink-to-fit=no");
        if (font) {
            const link = document.createElement('link');
            link.href = font;
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        }
    }, [pageTitle, font]);

    return null;
}

export default SEO;
