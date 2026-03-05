export default function Summary({ summary }: { summary: string }) {
    return (
        <section>
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-8 h-px bg-primary inline-block" />
            About
        </h2>
        <p className="text-gray-300 leading-relaxed">{summary}</p>
        </section>
    );
}