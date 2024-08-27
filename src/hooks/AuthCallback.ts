import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supaBase';

function AuthCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        const handleAuthCallback = async () => {
            try {
                const { data, error } = await supabase.auth.getSession();
                if (error) throw error;

                if (data.session?.access_token) {
                    localStorage.setItem('accessToken', data.session.access_token);
                    // After storing the token, navigate to the chatHome page
                    navigate('/chatHome');
                }
                console.log('succes at auth callback')
            } catch (error) {
                console.error('Error during authentication callback:', error);
                // Optionally, navigate to an error page or show a message
                console.log('no success at authcallback page')
            }
        };

        handleAuthCallback();
    }, [navigate]);

    return null; // This component does not need to render anything
}

export default AuthCallback;
