import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function RegisterPage() {
    const [name, setName] = useState('');          // contoh jika butuh nama pengguna
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('Password dan konfirmasi password tidak cocok.');
            return;
        }

        try {
            // sesuaikan field sesuai backend (misal name optional)
            const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
      await axios.post('${API_URL}/api/auth/register', { 
                name, 
                email, 
                password 
            });

            setSuccess('Registrasi berhasil! Silakan login.');
            // Arahkan ke halaman login setelah beberapa detik
            setTimeout(() => navigate('/login'), 1500);
        } catch (err) {
            setError(err.response?.data?.message || 'Registrasi gagal, silakan coba lagi.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center text-gray-800">Daftar Akun SisDigi UMKM</h1>
                
                {error && <p className="text-red-500 text-center">{error}</p>}
                {success && <p className="text-green-600 text-center">{success}</p>}

                <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="text-sm font-semibold text-gray-600">Nama</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="text-sm font-semibold text-gray-600">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-sm font-semibold text-gray-600">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-600">Konfirmasi Password</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <button type="submit" className="w-full py-3 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
                        Daftar
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600">
                    Sudah punya akun?{' '}
                    <Link to="/login" className="font-semibold text-indigo-600 hover:underline">
                        Login di sini
                    </Link>
                </p>
            </div>
        </div>
    );
}
