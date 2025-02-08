import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Bold, Italic, Underline } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { initiatePlatformAuth, refreshAccessToken, type PlatformConnection } from "@/services/platformAuth"

export default function Dashboard() {
  const [content, setContent] = useState('')
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [media, setMedia] = useState<File | null>(null)
  const [connections, setConnections] = useState<PlatformConnection[]>([])
  const [preview, setPreview] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const handlePlatformChange = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    )
  }

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setMedia(e.target.files[0])
    }
  }

  const handleSubmit = async () => {
    if (!content) {
      toast({
        title: "Missing Content",
        description: "Please enter some content.",
        variant: "destructive"
      })
      return
    }

    if (selectedPlatforms.length === 0) {
      toast({
        title: "No Platforms Selected",
        description: "Please select at least one platform.",
        variant: "destructive"
      })
      return
    }

    setIsLoading(true)
    try {
      // Submit content to each selected platform
      for (const platform of selectedPlatforms) {
        const connection = connections.find(c => c.platform === platform)
        if (!connection) continue

        // Check if token needs refresh
        if (connection.expiresAt <= Date.now()) {
          const refreshedToken = await refreshAccessToken(platform, connection.refreshToken)
          if (!refreshedToken) {
            toast({
              title: `${platform} Connection Error`,
              description: "Failed to refresh connection. Please reconnect.",
              variant: "destructive"
            })
            continue
          }
          
          // Update connection with new tokens
          setConnections(prev => prev.map(c => 
            c.platform === platform 
              ? { ...c, ...refreshedToken }
              : c
          ))
        }

        // Post content to platform
        // This will be implemented in step 004
      }

      setContent('')
      setSelectedPlatforms([])
      setIsBold(false)
      setIsItalic(false)
      setIsUnderline(false)
      setMedia(null)
      setPreview(false)
      toast({
        title: "Success",
        description: "Content submitted successfully!",
      })
    } catch (error) {
      console.error('Content submission error:', error)
      toast({
        title: "Error",
        description: "Failed to submit content. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const applyFormatting = (text: string) => {
    let formattedText = text
    if (isBold) formattedText = `<strong>${formattedText}</strong>`
    if (isItalic) formattedText = `<em>${formattedText}</em>`
    if (isUnderline) formattedText = `<u>${formattedText}</u>`
    return formattedText
  }

  const togglePreview = () => {
    setPreview(!preview)
  }

  const handleConnectPlatform = async (platform: string) => {
    try {
      if (connections.some(c => c.platform === platform)) {
        // Disconnect platform
        setConnections(prev => prev.filter(c => c.platform !== platform))
        toast({
          title: "Platform Disconnected",
          description: `Successfully disconnected from ${platform}.`
        })
      } else {
        // Connect platform
        await initiatePlatformAuth(platform)
      }
    } catch (error) {
      console.error('Platform connection error:', error)
      toast({
        title: "Connection Error",
        description: `Failed to connect to ${platform}. Please try again.`,
        variant: "destructive"
      })
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <Card>
        <CardHeader>
          <CardTitle>Create and Post Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="content" className="block mb-2">
              Content
            </Label>
            <Textarea
              id="content"
              value={content}
              onChange={handleContentChange}
              className="w-full"
              rows={4}
              disabled={isLoading}
            />
            <div className="flex space-x-2 mt-2">
              <Button
                variant="outline"
                onClick={() => setIsBold(!isBold)}
                className={isBold ? 'bg-gray-100' : ''}
                disabled={isLoading}
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsItalic(!isItalic)}
                className={isItalic ? 'bg-gray-100' : ''}
                disabled={isLoading}
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsUnderline(!isUnderline)}
                className={isUnderline ? 'bg-gray-100' : ''}
                disabled={isLoading}
              >
                <Underline className="h-4 w-4" />
              </Button>
              <Button variant="outline" asChild disabled={isLoading}>
                <label htmlFor="media-upload">
                  <Upload className="h-4 w-4" />
                </label>
              </Button>
              <Input
                id="media-upload"
                type="file"
                onChange={handleMediaChange}
                className="hidden"
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="mb-4">
            <Label className="block mb-2">Select Platforms</Label>
            <div className="flex flex-wrap gap-2">
              {['Facebook', 'Twitter/X', 'Instagram', 'TikTok', 'YouTube Shorts', 'Threads'].map((platform) => (
                <div key={platform} className="flex items-center space-x-2">
                  <Checkbox
                    id={platform}
                    checked={selectedPlatforms.includes(platform)}
                    onCheckedChange={() => handlePlatformChange(platform)}
                    disabled={!connections.some(c => c.platform === platform) || isLoading}
                  />
                  <Label htmlFor={platform}>{platform}</Label>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <Label className="block mb-2">Connect Platforms</Label>
            <div className="flex flex-wrap gap-2">
              {['Facebook', 'Twitter/X', 'Instagram', 'TikTok', 'YouTube Shorts', 'Threads'].map((platform) => {
                const isConnected = connections.some(c => c.platform === platform);
                return (
                  <Button
                    key={platform}
                    variant={isConnected ? 'secondary' : 'outline'}
                    onClick={() => handleConnectPlatform(platform)}
                    className="mb-2"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Please wait...' : isConnected ? 'Connected' : 'Connect'} {platform}
                  </Button>
                );
              })}
            </div>
          </div>
          <Button onClick={togglePreview} className="mb-4" disabled={isLoading}>
            Preview Post
          </Button>
          {preview && (
            <div className="mb-4 p-4 border border-gray-200 rounded">
              <h3 className="text-lg font-bold mb-2">Preview</h3>
              <div dangerouslySetInnerHTML={{ __html: applyFormatting(content) }} />
              {media && (
                <div className="mt-2">
                  <p>Media: {media.name}</p>
                  {media.type.startsWith('image/') && (
                    <div className="mt-2">
                      <img src={URL.createObjectURL(media)} alt="Preview" className="max-w-full h-auto" />
                    </div>
                  )}
                </div>
              )}
              <div className="mt-2">
                <p>Platforms: {selectedPlatforms.join(', ')}</p>
              </div>
            </div>
          )}
          <Button 
            onClick={handleSubmit} 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit Post'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
