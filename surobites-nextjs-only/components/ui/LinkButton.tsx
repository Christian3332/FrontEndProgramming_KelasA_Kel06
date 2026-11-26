"use client";

import Link from "next/link";
import { Button, type ButtonProps } from "react-bootstrap";

type Props = ButtonProps & { href: string };

// Button react-bootstrap belum bisa diberi as={Link} di TypeScript, jadi dipasang sekali di sini
export default function LinkButton(props: Props) {
  return <Button as={Link as unknown as "a"} {...props} />;
}
