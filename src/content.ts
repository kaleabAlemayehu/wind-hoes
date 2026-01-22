/**
 * Content script that replaces all instances of "windows" with "wind-hoes"
 * on web pages, preserving the original case.
 */

// Track processed nodes to avoid reprocessing
const processedNodes = new WeakSet<Node>();

/**
 * Preserves the case of the original word when replacing
 */
function preserveCase(original: string, replacement: string): string {
  // All uppercase
  if (original === original.toUpperCase()) {
    return replacement.toUpperCase();
  }

  // First letter uppercase (Title Case)
  if (original[0] === original[0].toUpperCase()) {
    return replacement.charAt(0).toUpperCase() + replacement.slice(1);
  }

  // All lowercase
  return replacement.toLowerCase();
}

/**
 * Replace "windows" with "wind-hoes" in text, preserving case
 */
function replaceText(text: string): string {
  // Match "windows" in any case and preserve the case in replacement
  return text.replace(/windows/gi, (match) => preserveCase(match, 'wind-hoes'));
}

/**
 * Process a text node and replace occurrences
 */
function processTextNode(node: Text): void {
  if (processedNodes.has(node)) {
    return;
  }

  const originalText = node.nodeValue || '';
  const newText = replaceText(originalText);

  if (newText !== originalText) {
    node.nodeValue = newText;
  }

  processedNodes.add(node);
}

/**
 * Walk through the DOM tree and process all text nodes
 */
function walkAndReplace(node: Node): void {
  // Skip script, style, and noscript tags
  if (node.nodeName === 'SCRIPT' || node.nodeName === 'STYLE' || node.nodeName === 'NOSCRIPT') {
    return;
  }

  // Process text nodes
  if (node.nodeType === Node.TEXT_NODE) {
    processTextNode(node as Text);
  } else {
    // Recursively process child nodes
    const children = node.childNodes;
    for (let i = 0; i < children.length; i++) {
      walkAndReplace(children[i]);
    }
  }
}

/**
 * Initialize the extension
 */
function init(): void {
  // Process existing content
  walkAndReplace(document.body);

  // Watch for dynamically added content
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        walkAndReplace(node);
      });

      // Also check for text changes in existing nodes
      if (mutation.type === 'characterData' && mutation.target.nodeType === Node.TEXT_NODE) {
        processTextNode(mutation.target as Text);
      }
    });
  });

  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
  });
}

// Run when DOM is ready
if (document.body) {
  init();
} else {
  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', init);
}
