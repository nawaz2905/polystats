import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WalletInput } from "../components/WalletInput";

const VALID_ADDRESS = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";
const INVALID_ADDRESS = "not-an-address";

describe("WalletInput", () => {
    it("calls onSearch with a valid Ethereum address", async () => {
        const onSearch = vi.fn();
        render(<WalletInput onSearch={onSearch} isLoading={false} />);

        await userEvent.type(screen.getByLabelText("Wallet address"), VALID_ADDRESS);
        await userEvent.click(screen.getByRole("button", { name: "Analyze" }));

        expect(onSearch).toHaveBeenCalledWith(VALID_ADDRESS);
        expect(screen.queryByText(/must be a valid/i)).not.toBeInTheDocument();
    });

    it("shows a validation error and does not call onSearch for an invalid address", async () => {
        const onSearch = vi.fn();
        render(<WalletInput onSearch={onSearch} isLoading={false} />);

        await userEvent.type(screen.getByLabelText("Wallet address"), INVALID_ADDRESS);
        await userEvent.click(screen.getByRole("button", { name: "Analyze" }));

        expect(onSearch).not.toHaveBeenCalled();
        expect(screen.getByText(/must be a valid/i)).toBeInTheDocument();
    });

    it("clears the error when the user types again", async () => {
        const onSearch = vi.fn();
        render(<WalletInput onSearch={onSearch} isLoading={false} />);

        const input = screen.getByLabelText("Wallet address");
        await userEvent.type(input, INVALID_ADDRESS);
        await userEvent.click(screen.getByRole("button", { name: "Analyze" }));
        expect(screen.getByText(/must be a valid/i)).toBeInTheDocument();

        await userEvent.type(input, "x");
        expect(screen.queryByText(/must be a valid/i)).not.toBeInTheDocument();
    });
});
