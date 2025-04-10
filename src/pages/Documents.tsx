
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  FileText,
  File,
  Image,
  FileIcon,
  Download,
  Eye,
  MoreHorizontal,
  Upload,
  Filter,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Document {
  id: string;
  employeeId: string;
  employeeName: string;
  documentType: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  uploadDate: string;
  status: string;
}

// Mock documents data
const documents: Document[] = [
  {
    id: "DOC001",
    employeeId: "EMP001",
    employeeName: "John Smith",
    documentType: "ID Proof",
    fileName: "john_passport.pdf",
    fileType: "pdf",
    fileSize: "2.4 MB",
    uploadDate: "2023-10-15",
    status: "Verified",
  },
  {
    id: "DOC002",
    employeeId: "EMP001",
    employeeName: "John Smith",
    documentType: "Resume",
    fileName: "john_smith_resume.pdf",
    fileType: "pdf",
    fileSize: "1.2 MB",
    uploadDate: "2023-08-20",
    status: "Verified",
  },
  {
    id: "DOC003",
    employeeId: "EMP002",
    employeeName: "Sarah Johnson",
    documentType: "ID Proof",
    fileName: "sarah_drivers_license.jpg",
    fileType: "jpg",
    fileSize: "3.5 MB",
    uploadDate: "2023-09-10",
    status: "Verified",
  },
  {
    id: "DOC004",
    employeeId: "EMP003",
    employeeName: "Michael Brown",
    documentType: "Offer Letter",
    fileName: "michael_offer_letter.pdf",
    fileType: "pdf",
    fileSize: "1.8 MB",
    uploadDate: "2023-09-05",
    status: "Pending",
  },
  {
    id: "DOC005",
    employeeId: "EMP004",
    employeeName: "Emily Davis",
    documentType: "Certificate",
    fileName: "emily_certificate.jpg",
    fileType: "jpg",
    fileSize: "2.1 MB",
    uploadDate: "2023-10-25",
    status: "Pending",
  },
  {
    id: "DOC006",
    employeeId: "EMP005",
    employeeName: "James Wilson",
    documentType: "Contract",
    fileName: "james_contract.pdf",
    fileType: "pdf",
    fileSize: "4.0 MB",
    uploadDate: "2023-11-01",
    status: "Verified",
  },
];

// Filter options
const documentTypes = [
  "All Types",
  "ID Proof",
  "Resume",
  "Offer Letter",
  "Contract",
  "Certificate",
  "Other",
];

const DocumentIcon = ({ fileType }: { fileType: string }) => {
  switch (fileType.toLowerCase()) {
    case "pdf":
      return <FileText className="h-5 w-5 text-red-500" />;
    case "jpg":
    case "jpeg":
    case "png":
      return <Image className="h-5 w-5 text-blue-500" />;
    case "docx":
    case "doc":
      return <FileText className="h-5 w-5 text-blue-600" />;
    default:
      return <File className="h-5 w-5 text-gray-500" />;
  }
};

const Documents = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentDetails, setDocumentDetails] = useState({
    employeeId: "",
    documentType: "",
  });

  // Filter documents based on search term and selected type
  const filteredDocuments = documents.filter((document) => {
    const matchesSearch =
      document.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      document.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      document.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      document.documentType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      selectedType === "All Types" ||
      document.documentType === selectedType;

    return matchesSearch && matchesType;
  });

  // Check if user is logged in
  React.useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDetailChange = (field: string, value: string) => {
    setDocumentDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile || !documentDetails.employeeId || !documentDetails.documentType) {
      toast.error("Please fill all required fields and select a file");
      return;
    }

    // In a real app, you would upload the file to your server here
    console.log("Uploading file:", selectedFile);
    console.log("Document details:", documentDetails);

    toast.success("Document uploaded successfully");
    setUploadDialogOpen(false);
    setSelectedFile(null);
    setDocumentDetails({
      employeeId: "",
      documentType: "",
    });
  };

  const handleViewDocument = (document: Document) => {
    console.log("Viewing document:", document);
    toast.info(`Viewing ${document.fileName}`);
  };

  const handleDownloadDocument = (document: Document) => {
    console.log("Downloading document:", document);
    toast.success(`Downloading ${document.fileName}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Document Management</h1>
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              <span>Upload Document</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <form onSubmit={handleUpload}>
              <DialogHeader>
                <DialogTitle>Upload Document</DialogTitle>
                <DialogDescription>
                  Upload a new document to the system
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="employeeId">Employee ID</Label>
                  <Input
                    id="employeeId"
                    placeholder="Enter employee ID"
                    value={documentDetails.employeeId}
                    onChange={(e) => handleDetailChange("employeeId", e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="documentType">Document Type</Label>
                  <Select
                    value={documentDetails.documentType}
                    onValueChange={(value) => handleDetailChange("documentType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes.slice(1).map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="file">File</Label>
                  <Input
                    id="file"
                    type="file"
                    onChange={handleFileChange}
                  />
                  {selectedFile && (
                    <p className="text-sm text-muted-foreground">
                      {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setUploadDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Upload</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
          <CardDescription>
            Manage employee documents and files
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search documents..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select
              value={selectedType}
              onValueChange={setSelectedType}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                {documentTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2 ml-auto">
              <Filter className="h-4 w-4" />
              <span>More Filters</span>
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File</TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead className="hidden md:table-cell">Type</TableHead>
                  <TableHead className="hidden md:table-cell">Size</TableHead>
                  <TableHead className="hidden md:table-cell">Date Uploaded</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((document) => (
                  <TableRow key={document.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <DocumentIcon fileType={document.fileType} />
                        <div className="font-medium">{document.fileName}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>{document.employeeName}</div>
                      <div className="text-xs text-muted-foreground">{document.employeeId}</div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{document.documentType}</TableCell>
                    <TableCell className="hidden md:table-cell">{document.fileSize}</TableCell>
                    <TableCell className="hidden md:table-cell">{document.uploadDate}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          document.status === "Verified"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-yellow-50 text-yellow-700 border-yellow-200"
                        }
                      >
                        {document.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDocument(document)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownloadDocument(document)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Download</DropdownMenuItem>
                            <DropdownMenuItem>Verify</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredDocuments.length === 0 && (
              <div className="p-6 text-center">
                <p className="text-muted-foreground">No documents found.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Documents;
