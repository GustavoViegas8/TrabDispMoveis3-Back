export function GenerateRandonId() : string {
    const Head = Date.now().toString(36);
    const Tail = Math.random().toString(36).substr(2);

    return Head + Tail
}