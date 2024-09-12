type ElementsProps = {
    className?: string;
    id?: string;
};

const DefaultProps: ElementsProps = {
    id: '',
    className: '',
};

const Table = (
    header: string | null,
    body: string | null,
    footer: string | null,
    options: ElementsProps = DefaultProps,
) => {
    let children: string = '';

    if (header) children += header;
    if (body) children += body;
    if (footer) children += footer;

    return `<table class="${options.className}" id=${options.id}>${children}`;
};

const Header = (children: string = '', options: ElementsProps = DefaultProps) => {
    return `<thead class="${options.className}" id=${options.id}>${children}</thead>`;
};

const Body = (children: string | string[] = '', options: ElementsProps = DefaultProps) => {
    if (children instanceof Array) {
        return `<tbody class="${options.className}" id=${options.id}>${children.join('')}</tbody>`;
    }

    return `<tbody class="${options.className}" id=${options.id}>${children}</tbody>`;
};

const Footer = (children: string | string[] = '', options: ElementsProps = DefaultProps) => {
    return `<tfoot class="${options.className}">${children}</tfoot>`;
};

const Row = (children: string | string[] = '', options: ElementsProps = DefaultProps) => {
    if (children instanceof Array) {
        return `<tr class="${options.className}" id=${options.id}>${children.join('')}</tr>`;
    }

    return `<tr class="${options.className}" id=${options.id}>${children}</tr>`;
};

const Cell = (children: any = '', options: ElementsProps = DefaultProps) => {
    return `<td class="${options.className}" id=${options.id}>${children}</td>`;
};

const HCell = (children: any = '', options: ElementsProps = DefaultProps) => {
    return `<th class="${options.className}" id=${options.id}>${children}</th>`;
};

export { Table, Header, Body, Footer, Row, Cell, HCell };
