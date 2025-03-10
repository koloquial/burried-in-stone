export default function Loading({ children }) {
    return (
        <div className="loading-container">
            <div className="spinner"></div>
            <p>{children}</p>
        </div>
    );
}
