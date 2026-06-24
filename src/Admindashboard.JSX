// Optional: Admin Dashboard to View Contact Submissions
// This is an advanced feature - only if you want to see submissions in your app

import React, { useState, useEffect } from 'react';
import { database, ref, update, remove } from '@/lib/firebase';

export default function AdminDashboard() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('unread'); // 'all', 'unread', 'read'

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const snapshot = await database.ref('contactMessages').once('value');
            const data = snapshot.val() || {};

            // Convert to array and sort by timestamp (newest first)
            const messageArray = Object.entries(data).map(([id, message]) => ({
                id,
                ...message,
            }));

            messageArray.sort((a, b) =>
                new Date(b.timestamp) - new Date(a.timestamp)
            );

            setMessages(messageArray);
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (id) => {
        try {
            await update(ref(database, `contactMessages/${id}`), { read: true });
            setMessages(messages.map(msg =>
                msg.id === id ? { ...msg, read: true } : msg
            ));
        } catch (error) {
            console.error('Error marking as read:', error);
        }
    };

    const deleteMessage = async (id) => {
        if (!confirm('Are you sure you want to delete this message?')) return;

        try {
            await remove(ref(database, `contactMessages/${id}`));
            setMessages(messages.filter(msg => msg.id !== id));
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    const filteredMessages = messages.filter(msg => {
        if (filter === 'unread') return !msg.read;
        if (filter === 'read') return msg.read;
        return true;
    });

    if (loading) {
        return <div className="p-8 text-center">Loading messages...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        Contact Messages
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Total: {messages.length} | Unread: {messages.filter(m => !m.read).length}
                    </p>
                </div>

                {/* Filter Buttons */}
                <div className="mb-6 flex gap-2">
                    {['all', 'unread', 'read'].map(filterType => (
                        <button
                            key={filterType}
                            onClick={() => setFilter(filterType)}
                            className={`px-4 py-2 rounded-lg font-medium capitalize transition ${filter === filterType
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                        >
                            {filterType}
                        </button>
                    ))}
                    <button
                        onClick={fetchMessages}
                        className="ml-auto px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
                    >
                        Refresh
                    </button>
                </div>

                {/* Messages List */}
                {filteredMessages.length === 0 ? (
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
                        <p className="text-gray-500 dark:text-gray-400">No messages found</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {filteredMessages.map(message => (
                            <div
                                key={message.id}
                                className={`bg-white dark:bg-gray-800 rounded-lg p-6 shadow transition ${!message.read ? 'border-l-4 border-blue-500' : ''
                                    }`}
                            >
                                {/* Message Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            {message.subject}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                            From: <span className="font-medium">{message.name}</span> ({message.email})
                                        </p>
                                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                            {new Date(message.timestamp).toLocaleString('en-US', {
                                                dateStyle: 'medium',
                                                timeStyle: 'short',
                                            })}
                                        </p>
                                    </div>

                                    {/* Status Badge */}
                                    {!message.read && (
                                        <span className="ml-4 inline-block bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 text-xs font-semibold px-3 py-1 rounded-full">
                                            Unread
                                        </span>
                                    )}
                                </div>

                                {/* Message Content */}
                                <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
                                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">
                                        {message.message}
                                    </p>
                                </div>

                                {/* Firebase ID */}
                                <div className="mb-4 text-xs text-gray-500 dark:text-gray-400 font-mono">
                                    ID: {message.id}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    {!message.read && (
                                        <button
                                            onClick={() => markAsRead(message.id)}
                                            className="px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                                        >
                                            Mark as Read
                                        </button>
                                    )}

                                    <a
                                        href={`mailto:${message.email}`}
                                        className="px-3 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition"
                                    >
                                        Reply
                                    </a>

                                    <button
                                        onClick={() => deleteMessage(message.id)}
                                        className="px-3 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition ml-auto"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}