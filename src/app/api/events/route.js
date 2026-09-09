import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src", "data", "events.json");

// Helper function to read events from disk with fallback
function readEventsFromFile() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return [];
    }
    const fileData = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(fileData || "[]");
  } catch (error) {
    console.error("Error reading events.json:", error);
    return [];
  }
}

// Helper function to write events to disk
function writeEventsToFile(events) {
  try {
    const dirPath = path.dirname(dataFilePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(events, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Error writing to events.json:", error);
    return false;
  }
}

// GET - Retrieve all events
export async function GET() {
  const events = readEventsFromFile();
  return NextResponse.json({ success: true, events }, { status: 200 });
}

// POST - Add a new event
export async function POST(request) {
  try {
    const body = await request.json();
    if (!body || !body.name || !body.month) {
      return NextResponse.json(
        { success: false, message: "Missing required fields (name, month)" },
        { status: 400 }
      );
    }

    const events = readEventsFromFile();
    const newEvent = {
      id: body.id || `event-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      month: (body.month || "JAN").toUpperCase(),
      name: body.name,
      date: body.date || "",
      color: body.color || "#0251c1",
      image: body.image || "",
      description: body.description || "",
      link: body.link || null,
      isClosed: typeof body.isClosed === "boolean" ? body.isClosed : false,
      endDate: body.endDate || "",
    };

    events.push(newEvent);
    const success = writeEventsToFile(events);

    if (!success) {
      return NextResponse.json(
        { success: false, message: "Failed to write data file" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, event: newEvent, events }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message || "Invalid request" },
      { status: 500 }
    );
  }
}

// PUT - Update an existing event
export async function PUT(request) {
  try {
    const body = await request.json();
    if (!body || !body.id) {
      return NextResponse.json(
        { success: false, message: "Event ID is required for updates" },
        { status: 400 }
      );
    }

    let events = readEventsFromFile();
    const index = events.findIndex((e) => e.id === body.id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, message: "Event not found" },
        { status: 404 }
      );
    }

    events[index] = {
      ...events[index],
      ...body,
      month: body.month ? body.month.toUpperCase() : events[index].month,
    };

    const success = writeEventsToFile(events);
    if (!success) {
      return NextResponse.json(
        { success: false, message: "Failed to write data file" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, event: events[index], events }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message || "Invalid request" },
      { status: 500 }
    );
  }
}

// DELETE - Remove an event
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Event ID query parameter is required" },
        { status: 400 }
      );
    }

    let events = readEventsFromFile();
    const initialLength = events.length;
    events = events.filter((e) => e.id !== id);

    if (events.length === initialLength) {
      return NextResponse.json(
        { success: false, message: "Event not found" },
        { status: 404 }
      );
    }

    const success = writeEventsToFile(events);
    if (!success) {
      return NextResponse.json(
        { success: false, message: "Failed to write data file" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "Event deleted successfully", events }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message || "Invalid request" },
      { status: 500 }
    );
  }
}
