import { useEffect, useState } from "react";

function Stat({ label, value }) {
    return (
        <div className="flex-1 px-4 py-3 text-center">
            <span className="block text-2xl font-bold text-gray-900">
                {Number(value ?? 0).toLocaleString()}
            </span>
            <span className="block text-xs uppercase tracking-wider text-gray-500">{label}</span>
        </div>
    );
}

function Meta({ children, path }) {
    if (!children) return null;
    return (
        <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg
                className="h-4 w-4 shrink-0 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d={path} />
            </svg>
            <span className="truncate">{children}</span>
        </div>
    );
}

export default function Github() {
    const [githubId , setGithubId] = useState('ritik-codes-maker');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const githubInfoProvider = async () => {
        const id = githubId.trim();
        if (!id) {
            setData(null);
            setError("Enter a GitHub username.");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`https://api.github.com/users/${id}`);
            const json = await res.json();
            if (!res.ok) {
                setData(null);
                setError(json.message ?? `Request failed (${res.status})`);
            } else {
                setData(json);
            }
        } catch (err) {
            setData(null);
            setError(err.message ?? "Couldn't reach the GitHub API.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
        githubInfoProvider();
    },[]);
    const handleSubmit = (e) => {
        e.preventDefault();
        githubInfoProvider();
    };

    return (
        <div className="min-h-[600px] bg-white px-4 py-16 ml-24">
            <form onSubmit={handleSubmit} className="mb-8 flex w-full max-w-sm gap-2">
                <input
                    type="text"
                    value={githubId}
                    onChange={(e) => setGithubId(e.target.value)}
                    placeholder="Enter a GitHub username"
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-orange-600"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-lg bg-orange-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-600 disabled:opacity-50"
                >
                    {loading ? "Loading…" : "Search"}
                </button>
            </form>

            {loading && (
                <p className="text-sm text-gray-500">Loading profile…</p>
            )}

            {!loading && error && (
                <div className="max-w-md rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center">
                    <h2 className="text-xl font-bold text-gray-900">Couldn&apos;t load the profile</h2>
                    <p className="mt-2 text-sm text-gray-600">{error}</p>
                </div>
            )}

            {!loading && !error && data && (
            <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl shadow-gray-200/60 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <div className="h-24 bg-gradient-to-r from-orange-600 via-orange-700 to-amber-800" />

                <div className="px-6 pb-6">
                    <img
                        className="-mt-14 h-28 w-28 rounded-full border-4 border-white bg-white object-cover shadow-md"
                        src={data.avatar_url}
                        alt={`${data.login} avatar`}
                    />

                    <div className="mt-4">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                            {data.name ?? data.login}
                        </h1>
                        <a
                            href={data.html_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm font-medium text-orange-700 hover:underline"
                        >
                            @{data.login}
                        </a>
                    </div>

                    {data.bio && <p className="mt-3 text-sm leading-relaxed text-gray-600">{data.bio}</p>}

                    <div className="mt-5 flex divide-x divide-gray-200 rounded-xl bg-gray-50 py-1">
                        <Stat label="Followers" value={data.followers} />
                        <Stat label="Following" value={data.following} />
                        <Stat label="Repos" value={data.public_repos} />
                    </div>

                    <div className="mt-5 space-y-2">
                        <Meta path="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z">
                            {data.location}
                        </Meta>
                        <Meta path="M3 21v-2a4 4 0 014-4h10a4 4 0 014 4v2 M12 3a4 4 0 100 8 4 4 0 000-8z">
                            {data.company}
                        </Meta>
                        <Meta path="M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5 M10.172 13.828a4 4 0 010-5.656l3-3a4 4 0 015.656 5.656l-1.5 1.5">
                            {data.blog}
                        </Meta>
                    </div>

                    <a
                        href={data.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-orange-700 px-6 py-3 font-medium text-white transition duration-300 ease-in-out hover:bg-orange-600"
                    >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.922.42.362.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.573C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                        </svg>
                        View Profile
                    </a>
                </div>
            </div>
            )}
        </div>
    );
}
